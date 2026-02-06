import React, { useState } from "react";
import { FaCloudUploadAlt, FaFileExcel } from "react-icons/fa";
import { toast } from "react-toastify";

/**
 * AdminUploadFileView component allows administrators to upload Excel files (.xlsx, .xls)
 * to the server via a POST request with FormData.
 */
export default function AdminUploadFileView() {
    const [uploading, setUploading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validation Rule: ONLY Excel files (.xlsx / .xls)
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'xlsx' && fileType !== 'xls') {
            toast.error("Please select only Excel files (.xlsx or .xls)");
            event.target.value = '';
            return;
        }

        const formData = new FormData();
        // Sending the file with the key required by the API
        formData.append("file", file);

        try {
            setUploading(true);
            setResponseMessage("");

            // API endpoint as required
            const response = await fetch(`https://api.musicandmore.co.in/api/v1/upload`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message || "File uploaded successfully!");
                setResponseMessage(data.message || "The file has been processed successfully.");
            } else {
                const errMsg = data.message || "Upload failed. Please check the file content and try again.";
                toast.error(errMsg);
                setResponseMessage(errMsg);
            }
        } catch (error) {
            console.error("Upload error:", error);
            const errText = "An error occurred during upload. Please try again.";
            toast.error(errText);
            setResponseMessage(errText);
        } finally {
            setUploading(false);
            // Reset input for subsequent uploads
            event.target.value = '';
        }
    };

    return (
        <div className="mmdc-admin-upload-view">
            <div className="mmdc-admin-header">
                <h1>Upload File</h1>
                <p className="mmdc-admin-subtitle">Select an Excel file to process bulk data</p>
            </div>

            <div className="mmdc-upload-section">
                <div className="mmdc-excel-upload-container">
                    <input
                        type="file"
                        id="adminExcelUpload"
                        accept=".xlsx, .xls"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                        disabled={uploading}
                    />
                    <label htmlFor="adminExcelUpload" className="mmdc-upload-label">
                        <div className="mmdc-upload-icon">
                            {uploading ? (
                                <div className="mmdc-loader-simple"></div>
                            ) : (
                                <FaCloudUploadAlt />
                            )}
                        </div>
                        <div className="mmdc-upload-text">
                            {uploading ? "Uploading Data..." : "Click to select Excel Sheet"}
                        </div>
                        <div className="mmdc-upload-hint">
                            Supports .xlsx and .xls formats.
                        </div>
                    </label>
                </div>

                {responseMessage && (
                    <div className={`mmdc-upload-response ${responseMessage.includes("failed") || responseMessage.includes("error") ? "error" : "success"}`}>
                        <strong>API Response:</strong>
                        <p>{responseMessage}</p>
                    </div>
                )}

                <div className="mmdc-upload-instructions">
                    <div className="flex items-center gap-2 mb-3 text-gray-700">
                        <FaFileExcel className="text-green-600" />
                        <h3 className="font-bold">Important Notes</h3>
                    </div>
                    <ul className="text-sm list-disc pl-5 mt-2 space-y-2">
                        <li>Ensure your Excel file follows the standardized template.</li>
                        <li>The system will validate the data before processing.</li>
                        <li>Large files might take a few seconds to upload depending on your connection.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
