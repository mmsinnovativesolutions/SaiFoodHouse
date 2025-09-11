import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertContactSchema.parse(formData);
      contactMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Invalid form data",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="contact-title">
          Contact Us
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our product catalog? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder="Your full name"
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="your.email@example.com"
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  placeholder="Tell us about your inquiry..."
                  rows={5}
                  required
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={contactMutation.isPending}
                data-testid="submit-button"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3" data-testid="contact-email">
                  <Mail className="text-primary mt-1 h-5 w-5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">catalog@foodbeverage.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="contact-phone">
                  <Phone className="text-primary mt-1 h-5 w-5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="contact-address">
                  <MapPin className="text-primary mt-1 h-5 w-5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      123 Catalog Street<br />
                      Food City, FC 12345
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Business Hours
              </h4>
              <div className="space-y-2 text-sm" data-testid="business-hours">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
