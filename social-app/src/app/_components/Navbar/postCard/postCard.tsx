" use client";
import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import { Button, CardMedia, Input } from "@mui/material";
import { Comment, Post } from "@/lib/interfaces/postInter";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "@/lib/Redux/store/store";
import { createComment } from "@/lib/Redux/slices/commentslice";
import { deletePost, getAllPosts } from "@/lib/Redux/slices/postslice";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Postcard({
  post,
  limitComment,
  favourites,
  handleTogle,
  
}: {
  post: Post;
  limitComment?: number;
  favourites: { id: string }[];
  handleTogle: (Post: Post) => void;
   isfavourite?: boolean;
    DelePost?: (post: Post) => Promise<void>;
}) {
  const [comment, setcomment] = React.useState("");
  const [comm, setcomm] = React.useState(false);
  const dispatch = useDispatch<storeDispatch>();
  const { comments } = useSelector((s: storeState) => s.commentSlice);
  const user = useSelector((state: storeState) => state.User.user);
  const isfavourite = favourites.some((fav) => fav.id == post._id);
  const [userPostID, setuserPostID] = React.useState("");
  async function AddComment() {
    await dispatch(createComment({ content: comment, post: post._id }));
    setcomment(" ");
    dispatch(getAllPosts());
   
  }

   React.useEffect(() => {
      console.log(comments);
    }, [comments]);
async function DelePost(){
  await dispatch(deletePost( post._id))
    await dispatch(getAllPosts());
}

  function addCom() {
    setcomm(!comm);
  }

  React.useEffect(() => {
    const tkn = Cookies.get("token");
    const decoded: { user: string; iat: Date } = jwtDecode(tkn!);
    setuserPostID(decoded?.user);
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ "--Card-radius": (theme) => theme.vars.radius.xs }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src={post.user.photo}
            sx={{ p: 0.5, border: "2px solid", borderColor: "background.body" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "lg" }}>{post.user.name}</Typography>
          <Typography sx={{ fontWeight: "sm" }}>
            {post.createdAt.slice(0, 10)}
          </Typography>
        </Box>
        {userPostID == post.user._id ? (
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
          >
            <Button onClick={DelePost}>
              <DeleteIcon />
            </Button>
          </IconButton>
        ) : (
          ""
        )}
      </CardContent>
      <CardContent>
        <Typography  sx={{ color: "gray", paddingTop: "40px" }}>
          {post.body}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component={"img"}
          height="450"
          sx={{}}
          image={post.image}
          alt="gdgd"
        />
      )}

      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 4 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <Button onClick={() => handleTogle(post)}>
              <FavoriteOutlinedIcon sx={{ color: isfavourite ? "red" : "" }} />
            </Button>
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <Button onClick={addCom}>
              <ModeCommentOutlined />
            </Button>
          </IconButton>

          <Button
            href={`/home/` + post._id}
            LinkComponent={Link}
            variant="text"
            color="primary"
          >
            <SendOutlined />
          </Button>
        </Box>
      </CardContent>
      {/* <CardContent>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: "15px", color: "text.tertiary", my: 0.5 }}
        >
        {post.createdAt}
        </Link>
      </CardContent> */}

      {post.comments.slice(0, limitComment).map((comment: Comment) => (
        <CardContent
          key={comment._id}
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Box>
            <Avatar
              size="sm"
              src={user?.photo}
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: "lg" }}>
              {comment.commentCreator.name}
            </Typography>
            <Typography sx={{ fontWeight: "semibold" }}>
              {comment.content}
            </Typography>
          </Box>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
          >
            <MoreHoriz />
          </IconButton>
        </CardContent>
      ))}

      {/* دا بتاع البوست متنساش  */}
      {comm ? (
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Avatar
              size="sm"
              src={user?.photo}
              sx={{
                p: 0.5,
                border: "2px solid",
                borderColor: "background.body",
              }}
            />
          </IconButton>
          <Input
            id="id1"
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            // variant="plain"
            // size="sm"
            placeholder="Add a comment…"
            sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
          />
          <Button onClick={AddComment}>
            <SendIcon />
          </Button>
        </CardContent>
      ) : (
        ""
      )}
    </Card>
  );
}
