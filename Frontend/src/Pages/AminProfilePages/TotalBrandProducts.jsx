import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileExcel } from "react-icons/fa";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_MAIN_API_ROUTE;

export default function TotalBrands() {
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file type
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'xlsx' && fileType !== 'xls') {
            toast.error("Please upload only Excel files (.xlsx or .xls)");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            const response = await fetch(`${BASE_URL}/uploadProducts`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message || "Excel data uploaded successfully!");
            } else {
                toast.error(data.message || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("An error occurred during upload. Please try again.");
        } finally {
            setUploading(false);
            // Reset input
            event.target.value = '';
        }
    };

    return (
        <div className="mmdc-chart-container">
            <h2 className="text-xl font-bold mb-6">Bulk Product Management</h2>
            <div className="mmdc-excel-upload-container">
                <input
                    type="file"
                    id="excelUpload"
                    accept=".xlsx, .xls"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                    disabled={uploading}
                />
                <label htmlFor="excelUpload" className="mmdc-upload-label">
                    <div className="mmdc-upload-icon">
                        {uploading ? (
                            <div className="mmdc-loader-simple"></div>
                        ) : (
                            <FaCloudUploadAlt />
                        )}
                    </div>
                    <div className="mmdc-upload-text">
                        {uploading ? "Uploading Data..." : "Upload Excel Sheet"}
                    </div>
                    <div className="mmdc-upload-hint">
                        Support for .xlsx and .xls files.
                        Make sure the format matches the required template.
                    </div>
                </label>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-3 mb-3 text-blue-700">
                    <FaFileExcel />
                    <h3 className="font-bold">Instructions</h3>
                </div>
                <ul className="text-sm text-blue-600 list-disc pl-5 space-y-2">
                    <li>Ensure all columns follow the specific product schema (Name, Price, Category, etc.).</li>
                    <li>Avoid duplicate Model Numbers in the same sheet.</li>
                    <li>Large files may take a few moments to process.</li>
                </ul>
            </div>
        </div>
    );
}