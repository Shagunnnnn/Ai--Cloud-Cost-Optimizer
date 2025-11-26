# 🌥️ AI Cloud Cost Optimizer  
A rule-based AI utility that analyzes cloud service components, detects cost inefficiencies, and provides actionable optimization suggestions.  
This project helps companies reduce cloud bills by showing **current cost**, **optimized cost**, **reasons for optimization**, and **total savings**.

---

## 🚀 Features

### ✅ **1. Component-wise Cost Breakdown**  
Users enter all cloud components such as EC2, S3, VPC, RDS, etc.  
Each component contains:
- Name  
- Cost  
- Usage %  
- Type (compute / storage / network / db)

### ✅ **2. Optimization Engine (Rule-Based AI)**  
The backend applies cost-saving rules:
- Low usage → downsize  
- High usage → switch to reserved / more efficient resource  
- Storage over-usage → lifecycle optimization  
- Network high billing → CDN recommendation  
- Unused components → removal suggestion  

### Output shows:
- Old cost  
- New cost  
- Savings  
- Which rule applied  
- Why the optimization was required  

### ✅ **3. Full Financial Summary**
- Total Current Cost  
- Total Optimized Cost  
- Total Savings  
- Breakdown of each component  

### ✅ **4. Clean UI Where Users Can Enter**
- Service Name  
- Component list  
- Cost  
- Usage%  
- Type  

---

## 🏗️ Tech Stack

### **Frontend**
- React JS  
- JavaScript  
- CSS  

### **Backend**
- Node.js  
- Express.js  

---

## 📥 Input Format (Very Important)

Enter component details like this:

