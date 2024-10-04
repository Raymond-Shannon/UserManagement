import React from "react";
import { Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#2c3e50", padding: "40px 20px", color: "white", marginTop: "50px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a company that specializes in providing the best software solutions.
              Our team is dedicated to delivering high-quality products and services.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2">
              <a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a>
            </Typography>
            <Typography variant="body2">
              <a href="/about" style={{ color: "white", textDecoration: "none" }}>About</a>
            </Typography>
            <Typography variant="body2">
              <a href="/services" style={{ color: "white", textDecoration: "none" }}>Services</a>
            </Typography>
            <Typography variant="body2">
              <a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
            </Typography>
          </Grid>

          {/* Contact Us Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: contact@company.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 234 567 890
            </Typography>

            {/* Social Media Icons */}
            <div style={{ marginTop: "10px" }}>
              <IconButton style={{ color: "white" }} href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton style={{ color: "white" }} href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton style={{ color: "white" }} href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Typography variant="body2" style={{ textAlign: "center", marginTop: "20px" }}>
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;