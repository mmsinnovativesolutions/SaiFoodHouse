import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, X, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UploadResponse {
  message: string;
  importedCount: number;
  errors: Array<{
    row: number;
    message: string;
    data: any;
  }>;
}

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dragOver, setDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      const token = data.token;
      
      localStorage.setItem('adminToken', token);
      setAdminToken(token);
      setIsAuthenticated(true);
      setPassword("");
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setIsAuthenticated(false);
    setUploadResult(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('excel', file);

      const response = await fetch('/api/admin/upload-excel', {
        method: 'POST',
        headers: {
          'x-admin-token': adminToken || '',
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      return response.json() as Promise<UploadResponse>;
    },
    onSuccess: (data) => {
      setUploadResult(data);
      toast({
        title: "Upload successful",
        description: data.message,
      });
      // Invalidate queries to refresh the product lists
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/brands"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold" data-testid="admin-login-title">
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your password to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    data-testid="input-admin-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !password}
                data-testid="button-login"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold" data-testid="admin-title">
            Admin Panel
          </h2>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            data-testid="button-logout"
          >
            Logout
          </Button>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload Excel files to update the product catalog. The system will replace all existing products with the new data.
        </p>
      </div>

      <div className="space-y-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Excel File Upload
            </CardTitle>
            <CardDescription>
              Upload an Excel file (.xlsx or .xls) with product data. Expected columns: BRAND/COMPANY, PRODUCT NAME, WEIGHT/PACK
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={handleDrop}
              data-testid="upload-dropzone"
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {uploadMutation.isPending ? "Uploading..." : "Drop your Excel file here"}
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse and select a file
              </p>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileInput}
                disabled={uploadMutation.isPending}
                className="hidden"
                id="file-upload"
                data-testid="file-input"
              />
              <Button
                asChild
                variant="outline"
                disabled={uploadMutation.isPending}
                data-testid="upload-button"
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  {uploadMutation.isPending ? "Processing..." : "Choose File"}
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Result */}
        {uploadResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Upload Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {uploadResult.message}
                </AlertDescription>
              </Alert>

              {uploadResult.errors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Warnings ({uploadResult.errors.length} rows had issues)
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uploadResult.errors.map((error, index) => (
                      <Alert key={index} variant="destructive">
                        <AlertDescription>
                          Row {error.row}: {error.message}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                onClick={() => setUploadResult(null)}
                className="mt-4"
                data-testid="close-results"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Format Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Excel File Format Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Required Columns:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>BRAND/COMPANY</strong> - The brand or company name (e.g., "Nestle", "Cadbury")</li>
                  <li><strong>PRODUCT NAME</strong> - The name of the product (e.g., "KitKat Chocolate")</li>
                  <li><strong>WEIGHT/PACK</strong> - The weight or packaging information (e.g., "200 Gm", "12*37.3 Gm")</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Alternative Column Names (also accepted):</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>BRAND, COMPANY, Brand, Company</li>
                  <li>Product Name, PRODUCT_NAME, Product</li>
                  <li>Weight/Pack, WEIGHT_PACK, Weight, Pack</li>
                </ul>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Uploading a new file will replace ALL existing products in the catalog. 
                  Make sure your Excel file contains all the products you want to keep.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}