export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Add your database tables here
    }
    Views: {
      // Add your database views here
    }
    Functions: {
      // Add your database functions here
    }
    Enums: {
      // Add your database enums here
    }
    CompositeTypes: {
      // Add your database composite types here
    }
  }
}
