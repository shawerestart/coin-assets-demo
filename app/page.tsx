"use client";
import MarketAssets, { MarketAssetsRef } from "@/components/MarketAssets";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Collapse,
  Container,
  IconButton,
} from "@mui/material";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Home() {
  const marketAssetsRef = useRef<MarketAssetsRef>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const onReload = async () => {
    setLoading(true);
    try {
      await marketAssetsRef.current?.reload?.();
      setLoading(false);
      setOpen(true);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Container maxWidth="lg">
        <LoadingButton
          className="w-full"
          variant="contained"
          loading={loading}
          onClick={onReload}
        >
          Reload
        </LoadingButton>
        {/* reload collapse */}
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, mt: 2 }}
          >
            Reload Successfully
          </Alert>
        </Collapse>
        {/* market assets */}
        <MarketAssets ref={marketAssetsRef} />
      </Container>
    </main>
  );
}
