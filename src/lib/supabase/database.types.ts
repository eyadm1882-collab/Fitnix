export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          gumroad_id: string | null;
          status: "active" | "cancelled" | "expired" | "pending";
          plan_type: "monthly" | "yearly" | "lifetime";
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          gumroad_id?: string | null;
          status?: "active" | "cancelled" | "expired" | "pending";
          plan_type: "monthly" | "yearly" | "lifetime";
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          gumroad_id?: string | null;
          status?: "active" | "cancelled" | "expired" | "pending";
          plan_type?: "monthly" | "yearly" | "lifetime";
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      pending_users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          requested_at: string;
          source: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          requested_at?: string;
          source?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          requested_at?: string;
          source?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
