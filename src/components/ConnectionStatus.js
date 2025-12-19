import React, { useState, useEffect } from "react";
import { Alert, Box, Chip, Typography } from "@mui/material";
import { CheckCircle, Error, Refresh } from "@mui/icons-material";

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        "https://backend-school-management-3e0z.onrender.com/api/test",
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setIsConnected(true);
        setError("");
        setLastChecked(new Date());
        console.log("✅ Backend connected:", data.message);
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (err) {
      console.error("❌ Connection check failed:", err.message);
      setIsConnected(false);
      if (err.name === "AbortError") {
        setError(
          "Connection timeout. Backend server may be slow or not running."
        );
      } else {
        setError(
          "Backend server not running. Please run START_FULL.bat first."
        );
      }
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  if (isConnected) {
    return (
      <Box sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
        <Chip
          icon={<CheckCircle />}
          label={`Connected ${
            lastChecked ? lastChecked.toLocaleTimeString() : ""
          }`}
          color="success"
          size="small"
          variant="outlined"
        />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <Alert
        severity="error"
        icon={<Error />}
        action={
          <Chip
            icon={<Refresh />}
            label={isChecking ? "Checking..." : "Retry"}
            size="small"
            onClick={checkConnection}
            disabled={isChecking}
            sx={{ color: "white" }}
          />
        }
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {error}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
          Make sure MongoDB is running and backend server is started
        </Typography>
      </Alert>
    </Box>
  );
};

export default ConnectionStatus;
