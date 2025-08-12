// Simple script to test the backend API
const axios = require("axios");

async function testAPI() {
  try {
    console.log("Testing backend API...");

    // Test first page
    const response = await axios.get(
      "http://localhost:8080/api/posts?page=0&limit=5"
    );

    console.log("✅ API Response Status:", response.status);
    console.log("✅ Total Elements:", response.data.totalElements);
    console.log("✅ Total Pages:", response.data.totalPages);
    console.log("✅ Current Page:", response.data.number);
    console.log("✅ Is Last Page:", response.data.last);
    console.log("✅ Posts Count:", response.data.content.length);

    if (response.data.content.length > 0) {
      console.log("✅ Sample Post:", {
        id: response.data.content[0].id,
        caption: response.data.content[0].caption,
        createdAt: response.data.content[0].createdAt,
      });
    }

    console.log("\n🎉 Backend API is working correctly!");
  } catch (error) {
    console.error("❌ API Test Failed:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
  }
}

testAPI();
