// Firebase 設定
const firebaseConfig = {
    apiKey: "AIzaSyDLZE8eTDv7s1sZU9keiNBQp0QHNA3t9R8",
    authDomain: "orderapp-2612d.firebaseapp.com",
    projectId: "orderapp-2612d",
    storageBucket: "orderapp-2612d.appspot.com",
    messagingSenderId: "281307467839",
    appId: "1:281307467839:web:c7608eaefde19be0e1e88a",
    measurementId: "G-MFECVJ92NM"
  };

// 初始化 Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 提交訂單
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const item = document.getElementById("item").value;
    const quantity = document.getElementById("quantity").value;

    db.collection("orders").add({
        name: name,
        item: item,
        quantity: quantity,
        status: "未處理"
    }).then(() => {
        alert("訂單提交成功！");
        document.getElementById("orderForm").reset();
    }).catch(error => {
        console.error("提交訂單錯誤: ", error);
    });
});
