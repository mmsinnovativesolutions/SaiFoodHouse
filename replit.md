# Food & Beverage Catalog Application

## Overview

This is a full-stack web application for managing and browsing a food and beverage product catalog. The application provides a comprehensive product management system with brand categorization, search functionality, Excel import capabilities, and a contact form. Built with modern web technologies, it features a clean, responsive interface for both end users and administrators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Brands, Products, Contact, and Admin
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with TypeScript and ES modules
- **Framework**: Express.js for REST API with middleware for request logging and error handling
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **File Processing**: Multer for file uploads with XLSX library for Excel file parsing
- **Development**: Vite integration for development mode with hot module replacement

### Data Storage Solutions
- **Database**: PostgreSQL using Neon serverless infrastructure
- **Schema Design**: Two main entities - Products (brand, productName, weightPack) and Contacts (name, email, message, timestamp)
- **Connection**: Connection pooling with @neondatabase/serverless for optimized database access
- **Migrations**: Drizzle Kit for database schema management and migrations

### Authentication and Authorization
- **Current State**: Password-protected admin authentication system implemented
- **Access Control**: Admin functionality protected with password "saifood12345"
- **Session Management**: Token-based authentication with localStorage persistence for admin sessions

### External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **File Upload**: Local file processing with Excel format validation
- **UI Framework**: Extensive Radix UI component ecosystem for accessibility
- **Development Tools**: Replit-specific plugins for development environment integration
- **Build System**: Vite with React plugin and TypeScript support

The application follows a clean separation of concerns with shared TypeScript schemas between frontend and backend, comprehensive error handling, and a responsive design system. The architecture supports both development and production environments with appropriate build configurations.