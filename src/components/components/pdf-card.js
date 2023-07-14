import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserAvatars from "./avatars";
import Box from "@mui/material/Box";
import { Link } from "next/link";
import { useRouter } from "next/navigation";

export default function PdfCard({ users, total, pdf }) {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: { xs: 400, md: 360 },
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height={140}
        image={
          pdf.cover_image ||
          "https://play-lh.googleusercontent.com/LvJB3SJdelN1ZerrndNgRcDTcgKO49d1A63C5hNJP06rMvsGkei-lwV52eYZJmMknCwW"
        }
      />
      <CardContent sx={{ height: { xs: 200, md: 160 } }}>
        <Typography gutterBottom variant="h5" component="div">
          {pdf.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pdf?.description?.substring(0, 200) + "..."}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: "end" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <UserAvatars users={users} total={total} />
          <Button onClick={() => router.push(`/pdf-help/detail/${pdf.id}`)} size="small">
            More
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
