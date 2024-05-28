// Declaration file for Mongoose

import { Document } from 'mongoose';

declare module 'mongoose' {
  // Extend the Document interface to include custom properties if needed
  export interface Document {
    // Add custom properties here
  }
}
