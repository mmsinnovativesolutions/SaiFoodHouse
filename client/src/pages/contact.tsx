import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Clock, Building, Users, Shield, Award, MessageSquare, Handshake, Package, HeadphonesIcon, ShoppingCart, Star, CheckCircle, FileText, Globe, Truck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

// Import background images
import productFlatlayBg from "@assets/generated_images/Food_beverage_product_flatlay_97becb28.png";
import groceryShelveBg from "@assets/generated_images/Grocery_store_product_shelves_e2e5fcad.png";
import abstractIconsBg from "@assets/generated_images/Abstract_food_beverage_icons_12ad5560.png";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    productInterest: "",
    quantity: "",
    enquiryType: "general",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contacts", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting Sai Food House. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", companyName: "", phone: "", productInterest: "", quantity: "", enquiryType: "general", message: "" });
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

  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="contact-hero-title">
              Contact Sai Food House
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto" data-testid="contact-hero-subtitle">
              Your Trusted Wholesale Distribution Partner
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto" data-testid="contact-hero-description">
              Reach out to discuss wholesale opportunities, bulk orders, partnerships, or any questions about our extensive product catalog.
            </p>
            
            {/* Quick Contact Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-testid="quick-contact-response">
                <Clock className="h-8 w-8 mx-auto mb-3 text-white" />
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm opacity-80">24-hour response guarantee for all inquiries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-testid="quick-contact-wholesale">
                <Package className="h-8 w-8 mx-auto mb-3 text-white" />
                <h3 className="font-semibold mb-2">Wholesale Pricing</h3>
                <p className="text-sm opacity-80">Competitive rates for bulk orders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20" data-testid="quick-contact-support">
                <HeadphonesIcon className="h-8 w-8 mx-auto mb-3 text-white" />
                <h3 className="font-semibold mb-2">Dedicated Support</h3>
                <p className="text-sm opacity-80">Personal account manager for key clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Contact Methods Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-testid="contact-methods-title">
              Connect With Our Teams
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Different teams for different needs - reach out to the right department for faster assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Sales & Orders */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="contact-sales">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-emerald-700 dark:text-emerald-300">Sales & Orders</h3>
                <p className="text-emerald-600/80 dark:text-emerald-400/80 mb-4 text-sm leading-relaxed">
                  New orders, pricing inquiries, product availability
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                    <Mail className="h-4 w-4 mr-2" /> sales@saifoodhouse.com
                  </p>
                  <p className="flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                    <Phone className="h-4 w-4 mr-2" /> +91 98765 43210
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="contact-support">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HeadphonesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Customer Support</h3>
                <p className="text-blue-600/80 dark:text-blue-400/80 mb-4 text-sm leading-relaxed">
                  Order tracking, delivery issues, account management
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <Mail className="h-4 w-4 mr-2" /> support@saifoodhouse.com
                  </p>
                  <p className="flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <Phone className="h-4 w-4 mr-2" /> +91 98765 43211
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Partnerships */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="contact-partnerships">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Partnerships</h3>
                <p className="text-purple-600/80 dark:text-purple-400/80 mb-4 text-sm leading-relaxed">
                  Brand partnerships, supplier onboarding, collaborations
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center justify-center text-purple-700 dark:text-purple-300">
                    <Mail className="h-4 w-4 mr-2" /> partnerships@saifoodhouse.com
                  </p>
                  <p className="flex items-center justify-center text-purple-700 dark:text-purple-300">
                    <Phone className="h-4 w-4 mr-2" /> +91 98765 43212
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Orders */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="contact-bulk">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-amber-700 dark:text-amber-300">Bulk Orders</h3>
                <p className="text-amber-600/80 dark:text-amber-400/80 mb-4 text-sm leading-relaxed">
                  Large volume orders, institutional sales, custom pricing
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center justify-center text-amber-700 dark:text-amber-300">
                    <Mail className="h-4 w-4 mr-2" /> bulk@saifoodhouse.com
                  </p>
                  <p className="flex items-center justify-center text-amber-700 dark:text-amber-300">
                    <Phone className="h-4 w-4 mr-2" /> +91 98765 43213
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Contact Form and Information */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${groceryShelveBg})` }}
        ></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent" data-testid="main-contact-title">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a specific question or requirement? Fill out the form below and we'll get back to you promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        placeholder="Your full name"
                        required
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Company Name
                      </label>
                      <Input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange("companyName")}
                        placeholder="Your company name"
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        placeholder="your.email@example.com"
                        required
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        placeholder="+91 98765 43210"
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="enquiryType" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Inquiry Type
                    </label>
                    <Select value={formData.enquiryType} onValueChange={handleSelectChange("enquiryType")}>
                      <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400" data-testid="select-enquiry-type">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="bulk">Bulk Orders</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="pricing">Pricing Information</SelectItem>
                        <SelectItem value="delivery">Delivery & Logistics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="productInterest" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Product Interest
                      </label>
                      <Input
                        type="text"
                        id="productInterest"
                        value={formData.productInterest}
                        onChange={handleInputChange("productInterest")}
                        placeholder="e.g., Beverages, Snacks, etc."
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-product-interest"
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Expected Quantity
                      </label>
                      <Input
                        type="text"
                        id="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange("quantity")}
                        placeholder="e.g., 100 cases monthly"
                        className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        data-testid="input-quantity"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange("message")}
                      placeholder="Tell us about your requirements, questions, or how we can help you..."
                      rows={5}
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    disabled={contactMutation.isPending}
                    data-testid="submit-button"
                  >
                    {contactMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Information and Credibility */}
            <div className="space-y-8">
              {/* Head Office Information */}
              <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                    <Building className="mr-3 h-6 w-6 text-blue-600" />
                    Head Office
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4" data-testid="office-email">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Email</p>
                        <p className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">info@saifoodhouse.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4" data-testid="office-phone">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <Phone className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Phone</p>
                        <p className="text-green-600 dark:text-green-400">+91 98765 43200</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Mon-Sat: 9:00 AM - 7:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4" data-testid="office-address">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                        <MapPin className="text-white h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Address</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Sai Food House Pvt. Ltd.<br />
                          Plot No. 45, Food Processing Park<br />
                          Sector 18, Gurgaon - 122015<br />
                          Haryana, India
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 shadow-xl">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-6 text-emerald-800 dark:text-emerald-200 flex items-center">
                    <Clock className="mr-3 h-6 w-6 text-emerald-600" />
                    Business Hours
                  </h4>
                  <div className="space-y-3" data-testid="business-hours">
                    <div className="flex justify-between items-center py-2 border-b border-emerald-200 dark:border-emerald-800">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">Monday - Friday</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-emerald-200 dark:border-emerald-800">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">Saturday</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">Sunday & Holidays</span>
                      <span className="text-red-500 dark:text-red-400 font-semibold">Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 text-center">
                      <strong>24/7 Emergency Support</strong> available for critical orders and urgent deliveries
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Business Credentials */}
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 shadow-xl">
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-6 text-amber-800 dark:text-amber-200 flex items-center">
                    <Shield className="mr-3 h-6 w-6 text-amber-600" />
                    Business Credentials
                  </h4>
                  <div className="space-y-4" data-testid="business-credentials">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-amber-800 dark:text-amber-200">FSSAI Licensed</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">License No: 12345678901234</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-amber-800 dark:text-amber-200">GST Registered</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">GSTIN: 06AABCS1234A1Z5</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-amber-800 dark:text-amber-200">ISO 22000:2018 Certified</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">Food Safety Management</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-amber-800 dark:text-amber-200">15+ Years Experience</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">Trusted wholesale partner since 2009</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${productFlatlayBg})` }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Quick answers to common questions about working with Sai Food House.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
            <AccordionItem value="minimum-orders" className="bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-indigo-800 dark:text-indigo-200 hover:no-underline">
                What are your minimum order requirements?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                Our minimum order value is ₹25,000 for new customers and ₹15,000 for established accounts. 
                This ensures cost-effective logistics and competitive pricing for our wholesale partners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery-areas" className="bg-white dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-purple-800 dark:text-purple-200 hover:no-underline">
                Which areas do you deliver to?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                We deliver across North India including Delhi NCR, Punjab, Haryana, Uttar Pradesh, Rajasthan, 
                and Himachal Pradesh. Express delivery available within 50km of our distribution centers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-terms" className="bg-white dark:bg-gray-800 rounded-lg border border-pink-200 dark:border-pink-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-pink-800 dark:text-pink-200 hover:no-underline">
                What are your payment terms?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                We offer flexible payment terms: 30-day credit for established customers, advance payment discounts, 
                and multiple payment methods including NEFT, RTGS, and digital wallets. Credit approval subject to verification.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="product-freshness" className="bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-green-800 dark:text-green-200 hover:no-underline">
                How do you ensure product freshness and quality?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                We maintain temperature-controlled warehouses, follow strict FIFO inventory rotation, 
                and conduct regular quality checks. All products come with manufacturer guarantees and our quality assurance promise.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bulk-pricing" className="bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-blue-800 dark:text-blue-200 hover:no-underline">
                Do you offer special pricing for bulk orders?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                Yes, we provide tiered pricing based on order volume and frequency. Large institutional orders, 
                chain restaurants, and high-volume retailers receive customized pricing. Contact our bulk sales team for quotes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="new-partnership" className="bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-amber-800 shadow-lg">
              <AccordionTrigger className="px-6 py-4 text-left font-semibold text-amber-800 dark:text-amber-200 hover:no-underline">
                How can I become a wholesale partner?
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                Contact our partnerships team with your business registration documents, GST certificate, 
                and trade references. We'll arrange a meeting to discuss terms, credit limits, and onboarding process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-900/10 dark:via-cyan-900/10 dark:to-blue-900/10 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-3"
          style={{ backgroundImage: `url(${abstractIconsBg})` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent" data-testid="guarantees-title">
              Our Service Guarantees
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your satisfaction is our commitment. We stand behind our service quality with these guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="guarantee-quality">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Quality Guarantee</h3>
                <p className="text-green-600/80 dark:text-green-400/80 leading-relaxed">
                  100% quality assurance on all products. Damaged or expired items replaced immediately at no cost.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="guarantee-delivery">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">On-Time Delivery</h3>
                <p className="text-blue-600/80 dark:text-blue-400/80 leading-relaxed">
                  Guaranteed delivery within promised timeframes. Compensation for delays beyond our control.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 hover:scale-105" data-testid="guarantee-support">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HeadphonesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">24-Hour Response</h3>
                <p className="text-purple-600/80 dark:text-purple-400/80 leading-relaxed">
                  All inquiries answered within 24 hours. Emergency support available 24/7 for urgent issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}