import { createClient } from "@supabase/supabase-js";

export const GradeAppDatabase = createClient(
  "https://luhosrvzqsvngltloytn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aG9zcnZ6cXN2bmdsdGxveXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzODM5ODIsImV4cCI6MjAzMTk1OTk4Mn0.Q1VXvvf8neO5C5jnxYG8gCEyNHSdzmLJf6w0Zjh_VLU"
);

export const UsersDatabase = createClient(
  "https://jibxypqphuipkxgmnwjo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppYnh5cHFwaHVpcGt4Z21ud2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1OTg2NDIsImV4cCI6MjAzODE3NDY0Mn0.fY8PTkdcJyrBOQ4Z2vLnXvNNmQuqnqW4NWzTeb_tGBE"
);
