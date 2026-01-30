# API Contract (Frontend ↔ Backend)

เอกสารนี้เป็นข้อตกลงกลางระหว่าง Frontend และ Backend  
ทุก API ต้องยึด request / response ตามเอกสารนี้  
ชื่อฟิลด์ทั้งหมดอิงตาม **Data Dictionary (Final)**

---

## Base URL
- DEV: <BE_BASE_URL>
- Example: http://localhost:4000

Frontend จะตั้งค่า baseURL ที่ไฟล์ `useApi.ts`

---

# 1. Authentication

## 1.1 Login

### Endpoint
POST /api/auth/login

### Description
เข้าสู่ระบบด้วย username และ password

### Request Body
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
{
  "access_token": "string",
  "refresh_token": "string",
  "user": {
    "user_id": "string",
    "username": "string",
    "display_name": "string",
    "role": "intern | mentor | manager",
    "status": "active"
  }
}
{
  "refresh_token": "string (required)"
}
{
  "access_token": "string",
  "refresh_token": "string"
}
{
  "invite_code": "string (required)",

  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required)",

  "first_name": "string (required)",
  "last_name": "string (required)",

  "display_name": "string (optional)",
  "gender": "male | female | other (optional)",
  "birth_date": "YYYY-MM-DD (optional)",

  "university": "string (optional)",
  "student_id": "string (optional)"
}
{
  "success": true,
  "user": {
    "user_id": "string",
    "username": "string",
    "display_name": "string",
    "role": "intern",
    "status": "active"
  }
}
{
  "valid": true,
  "invite_type": "register | team_change",

  "mentor": {
    "display_name": "string"
  },

  "team": {
    "token": "string"
  }
}
{
  "valid": false
}
Authorization: Bearer <access_token>
{
  "latitude": "number (required)",
  "longitude": "number (required)"
}
{
  "success": true,
  "checked_in_at": "ISO 8601 datetime"
}
