# URL Shortener

โปรเจคนี้เป็นเครื่องมือสำหรับย่อ URL (URL Shortener) ที่สามารถรับ URL ยาวและแปลงให้กลายเป็น URL สั้นที่สามารถนำไปใช้ได้ง่ายๆ โดยจะทำการเก็บ URL ต้นฉบับไว้ในฐานข้อมูล MongoDB และสามารถแปลงกลับไปที่ URL ต้นฉบับได้เมื่อคลิกที่ URL ที่ย่อแล้ว

## คุณสมบัติ

- รับ URL ยาวจากผู้ใช้
- สร้าง URL สั้นที่เป็นลิงก์ไปยัง URL ต้นฉบับ
- เก็บข้อมูล URL ต้นฉบับและ URL สั้นใน MongoDB
- สามารถเข้าไปยัง URL ต้นฉบับได้ผ่าน URL สั้น
- ตรวจสอบ URL ที่ซ้ำและไม่บันทึกซ้ำ

## เทคโนโลยีที่ใช้

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hashing Algorithm**: MD5 (ใช้แค่ 6 ตัวแรกของ Hash)
- **Frontend**: HTML, Tailwind CSS

## การติดตั้งและการใช้งาน

### 1. Clone โปรเจค

```bash
git clone -b main https://github.com/bigy2012/url-shortener.git
cd url-shortener
