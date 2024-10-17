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

// 獲取訂單並顯示在業者端
function loadOrders() {
    db.collection("orders").onSnapshot(snapshot => {
        const ordersDiv = document.getElementById("orders");
        ordersDiv.innerHTML = ""; // 清空訂單列表

        snapshot.forEach(doc => {
            const order = doc.data();
            ordersDiv.innerHTML += `
                <div>
                    <h3>顧客: ${order.name}</h3>
                    <p>商品: ${order.item}</p>
                    <p>數量: ${order.quantity}</p>
                    <p>狀態: ${order.status}</p>
                    <button onclick="updateStatus('${doc.id}', '已處理')">標記為已處理</button>
                </div><hr>
            `;
        });
    });
}

// 更新訂單狀態
function updateStatus(orderId, newStatus) {
    db.collection("orders").doc(orderId).update({
        status: newStatus
    }).then(() => {
        console.log("訂單狀態已更新");
    }).catch(error => {
        console.error("更新訂單狀態錯誤: ", error);
    });
}

// 加載訂單
loadOrders();
