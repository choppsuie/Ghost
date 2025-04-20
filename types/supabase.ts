export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dvpn_status: {
        Row: {
          id: number
          active: boolean
          user_id: string
        }
        Insert: {
          id?: number
          active: boolean
          user_id: string
        }
        Update: {
          id?: number
          active?: boolean
          user_id?: string
        }
      }
      vm_status: {
        Row: {
          id: number
          user_id: string
          status: string
        }
        Insert: {
          id?: number
          user_id: string
          status: string
        }
        Update: {
          id?: number
          user_id?: string
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
