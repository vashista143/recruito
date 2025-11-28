import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const optionalFieldsSchema = z.object({
  companyWebsite: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  companyLogoLink: z.string().optional().or(z.literal("")),
  department: z.string().max(50, "Maximum 50 characters").optional().or(z.literal("")),
  location: z.string().max(50, "Maximum 50 characters").optional().or(z.literal("")),
});

export default function RecruiterOptionalForm({ authuser }) {

  const form = useForm({
    resolver: zodResolver(optionalFieldsSchema),
    defaultValues: {
      companyWebsite: "",
      companyLogoLink: "",
      department: "",
      location: "",
    },
  });

  // ⭐ Prefill the form when authuser loads
  React.useEffect(() => {
    if (authuser) {
      form.reset({
        companyWebsite: authuser.companyWebsite || "",
        companyLogoLink: authuser.companyLogoLink || "",
        department: authuser.department || "",
        location: authuser.location || "",
      });
    }
  }, [authuser, form]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch("/api/recruitereditprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        toast.error(result.message || "Failed to submit form.");
        return;
      }

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to submit form. Please try again.");
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Edit Profile Details
        </h2>

        {/* Render dynamic fields */}
        {["companyWebsite", "companyLogoLink", "department", "location"].map((fieldName) => (
          <Controller
            key={fieldName}
            name={fieldName}
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <label className="mb-1 text-gray-700 capitalize">
                  {fieldName.replace(/([A-Z])/g, " $1")}
                </label>

                <input
                  {...field}
                  placeholder={
                    fieldName === "companyWebsite"
                      ? "https://www.example.com"
                      : fieldName === "companyLogoLink"
                      ? "https://logo.png"
                      : fieldName === "department"
                      ? "Engineering / HR / QA"
                      : "Hyderabad / Bangalore"
                  }
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    fieldState.invalid ? "border-red-500" : "border-gray-300"
                  }`}
                />

                {fieldState.invalid && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        ))}

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={() => form.reset()}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
