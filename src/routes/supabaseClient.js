import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://luhosrvzqsvngltloytn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aG9zcnZ6cXN2bmdsdGxveXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzODM5ODIsImV4cCI6MjAzMTk1OTk4Mn0.Q1VXvvf8neO5C5jnxYG8gCEyNHSdzmLJf6w0Zjh_VLU"
);
