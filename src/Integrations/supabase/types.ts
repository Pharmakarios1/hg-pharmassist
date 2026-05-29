export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      consultations: {
        Row: {
          assessment: string | null;
          bp: string | null;
          complaints: string | null;
          created_at: string;
          created_by: string | null;
          current_medications: string | null;
          follow_up_date: string | null;
          history: string | null;
          id: string;
          notes: string | null;
          patient_id: string;
          pulse: string | null;
          temperature: string | null;
          treatment_plan: string | null;
          weight: string | null;
        };
        Insert: {
          assessment?: string | null;
          bp?: string | null;
          complaints?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_medications?: string | null;
          follow_up_date?: string | null;
          history?: string | null;
          id?: string;
          notes?: string | null;
          patient_id: string;
          pulse?: string | null;
          temperature?: string | null;
          treatment_plan?: string | null;
          weight?: string | null;
        };
        Update: {
          assessment?: string | null;
          bp?: string | null;
          complaints?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_medications?: string | null;
          follow_up_date?: string | null;
          history?: string | null;
          id?: string;
          notes?: string | null;
          patient_id?: string;
          pulse?: string | null;
          temperature?: string | null;
          treatment_plan?: string | null;
          weight?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "consultations_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      lab_tests: {
        Row: {
          created_at: string;
          created_by: string | null;
          file_url: string | null;
          id: string;
          interpretation: string | null;
          notes: string | null;
          patient_id: string;
          reference_range: string | null;
          result_value: string | null;
          test_date: string;
          test_name: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          file_url?: string | null;
          id?: string;
          interpretation?: string | null;
          notes?: string | null;
          patient_id: string;
          reference_range?: string | null;
          result_value?: string | null;
          test_date?: string;
          test_name: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          file_url?: string | null;
          id?: string;
          interpretation?: string | null;
          notes?: string | null;
          patient_id?: string;
          reference_range?: string | null;
          result_value?: string | null;
          test_date?: string;
          test_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lab_tests_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      medicines: {
        Row: {
          batch_no: string | null;
          category: string | null;
          cost_price: number | null;
          created_at: string;
          expiry_date: string | null;
          generic_name: string | null;
          id: string;
          name: string;
          selling_price: number | null;
          stock_qty: number;
          supplier: string | null;
          updated_at: string;
        };
        Insert: {
          batch_no?: string | null;
          category?: string | null;
          cost_price?: number | null;
          created_at?: string;
          expiry_date?: string | null;
          generic_name?: string | null;
          id?: string;
          name: string;
          selling_price?: number | null;
          stock_qty?: number;
          supplier?: string | null;
          updated_at?: string;
        };
        Update: {
          batch_no?: string | null;
          category?: string | null;
          cost_price?: number | null;
          created_at?: string;
          expiry_date?: string | null;
          generic_name?: string | null;
          id?: string;
          name?: string;
          selling_price?: number | null;
          stock_qty?: number;
          supplier?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      patients: {
        Row: {
          address: string | null;
          age: number | null;
          allergies: string | null;
          chronic_diseases: string | null;
          created_at: string;
          created_by: string | null;
          full_name: string;
          gender: string | null;
          id: string;
          next_of_kin: string | null;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          age?: number | null;
          allergies?: string | null;
          chronic_diseases?: string | null;
          created_at?: string;
          created_by?: string | null;
          full_name: string;
          gender?: string | null;
          id?: string;
          next_of_kin?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          age?: number | null;
          allergies?: string | null;
          chronic_diseases?: string | null;
          created_at?: string;
          created_by?: string | null;
          full_name?: string;
          gender?: string | null;
          id?: string;
          next_of_kin?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      sale_items: {
        Row: {
          counseling: string | null;
          dose: string | null;
          duration: string | null;
          frequency: string | null;
          id: string;
          medicine_id: string;
          medicine_name: string;
          quantity: number;
          sale_id: string;
          unit_price: number;
        };
        Insert: {
          counseling?: string | null;
          dose?: string | null;
          duration?: string | null;
          frequency?: string | null;
          id?: string;
          medicine_id: string;
          medicine_name: string;
          quantity: number;
          sale_id: string;
          unit_price: number;
        };
        Update: {
          counseling?: string | null;
          dose?: string | null;
          duration?: string | null;
          frequency?: string | null;
          id?: string;
          medicine_id?: string;
          medicine_name?: string;
          quantity?: number;
          sale_id?: string;
          unit_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sale_items_medicine_id_fkey";
            columns: ["medicine_id"];
            isOneToOne: false;
            referencedRelation: "medicines";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "sales";
            referencedColumns: ["id"];
          },
        ];
      };
      sales: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          notes: string | null;
          patient_id: string | null;
          total: number;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          patient_id?: string | null;
          total?: number;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          patient_id?: string | null;
          total?: number;
        };
        Relationships: [
          {
            foreignKeyName: "sales_patient_id_fkey";
            columns: ["patient_id"];
            isOneToOne: false;
            referencedRelation: "patients";
            referencedColumns: ["id"];
          },
        ];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_staff: { Args: { _user_id: string }; Returns: boolean };
    };
    Enums: {
      app_role: "admin" | "pharmacist" | "technician";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "pharmacist", "technician"],
    },
  },
} as const;
