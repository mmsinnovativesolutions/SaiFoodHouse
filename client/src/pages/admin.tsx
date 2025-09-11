import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('excel', file);

      const response = await fetch('/api/admin/upload-excel', {
        method: 'POST',
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="admin-title">
          Admin Panel
        </h2>
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