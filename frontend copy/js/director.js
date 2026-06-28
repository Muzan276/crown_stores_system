var user = checkAuth();
if (user) { document.getElementById('userName').textContent = user.fullName; }

function toggleDarkMode() {
  document.body.classList.toggle('dark');
  var btn = document.getElementById('darkBtn');
  btn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
}

fetchAPI('/reports/advanced-dashboard').then(function(data) {
  document.getElementById('todayTransactions').textContent = data.today.totalTransactions;
  document.getElementById('todayRevenue').textContent = '$' + parseFloat(data.today.totalRevenue).toFixed(2);
  document.getElementById('todayProfit').textContent = '$' + parseFloat(data.today.totalProfit).toFixed(2);
  document.getElementById('lowStockCount').textContent = data.lowStock.length;

  if (data.lowStock.length > 0) {
    document.getElementById('lowStockCard').style.border = '2px solid red';
    document.getElementById('lowStockCard').style.backgroundColor = '#fff5f5';
    document.getElementById('lowStockCount').style.color = 'red';
  }

  var topHtml = '';
  for (var i = 0; i < data.topProducts.length; i++) {
    topHtml += '<div class="top-product-item">';
    topHtml += '<div style="display:flex;align-items:center"><div class="product-rank">' + (i+1) + '</div>' + data.topProducts[i].product_name + '</div>';
    topHtml += '<strong>' + data.topProducts[i].totalSold + ' sold</strong>';
    topHtml += '</div>';
  }
  document.getElementById('topProducts').innerHTML = topHtml || '<p>No sales yet</p>';

  var lowHtml = '';
  for (var i = 0; i < data.lowStock.length; i++) {
    lowHtml += '<div class="low-stock-item">';
    lowHtml += '<span>' + data.lowStock[i].product_name + '</span>';
    lowHtml += '<span>Stock: ' + data.lowStock[i].quantity_available + ' / Reorder: ' + data.lowStock[i].reorder_level + '</span>';
    lowHtml += '</div>';
  }
  document.getElementById('lowStockList').innerHTML = lowHtml || '<p style="color:green">✅ All products have sufficient stock</p>';

  var recentHtml = '<table><tr><th>Product</th><th>Qty</th><th>Price</th><th>Paid</th><th>Agent</th><th>Date</th></tr>';
  for (var i = 0; i < data.recentSales.length; i++) {
    var s = data.recentSales[i];
    recentHtml += '<tr><td>' + s.product_name + '</td><td>' + s.quantity + '</td><td>$' + s.unit_price + '</td><td>$' + s.amount_paid + '</td><td>' + s.agent_name + '</td><td>' + new Date(s.sale_date).toLocaleDateString() + '</td></tr>';
  }
  recentHtml += '</table>';
  document.getElementById('recentSales').innerHTML = recentHtml;

  var stockLabels = [];
  var stockData = [];
  var stockColors = [];
  for (var i = 0; i < data.topProducts.length; i++) {
    stockLabels.push(data.topProducts[i].product_name);
    stockData.push(data.topProducts[i].totalSold);
    stockColors.push('#0f3460');
  }

  new Chart(document.getElementById('stockChart'), {
    type: 'bar',
    data: {
      labels: stockLabels,
      datasets: [{ label: 'Units Sold', data: stockData, backgroundColor: stockColors, borderRadius: 6 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });

  new Chart(document.getElementById('topChart'), {
    type: 'doughnut',
    data: {
      labels: stockLabels,
      datasets: [{ data: stockData, backgroundColor: ['#0f3460', '#16213e', '#27ae60', '#e74c3c', '#f39c12'] }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
});

function viewReport(type) {
  var reportData = document.getElementById('reportData');
  reportData.innerHTML = '<p>Loading...</p>';
  fetchAPI('/reports/' + type).then(function(data) {
    if (type === 'daily-sales') {
      var rows = '';
      data.sales.forEach(function(s) {
        rows += '<tr><td>' + s.product_name + '</td><td>' + s.quantity + '</td><td>$' + s.unit_price + '</td><td>$' + s.amount_paid + '</td><td>' + s.agent_name + '</td></tr>';
      });
      reportData.innerHTML = '<h4>Daily Sales - ' + data.date + '</h4><p>Transactions: <strong>' + data.totalTransactions + '</strong> | Revenue: <strong>$' + data.totalRevenue + '</strong></p><table><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Amount Paid</th><th>Agent</th></tr>' + rows + '</table>';
    } else if (type === 'inventory') {
      var rows = '';
      data.products.forEach(function(p) {
        rows += '<tr><td>' + p.product_name + '</td><td>' + p.category_name + '</td><td>' + p.quantity_available + '</td><td>' + p.reorder_level + '</td><td>' + p.status + '</td></tr>';
      });
      reportData.innerHTML = '<h4>Inventory Report</h4><p>Total: <strong>' + data.totalProducts + '</strong> | Low Stock: <strong>' + data.lowStockCount + '</strong></p><table><tr><th>Product</th><th>Category</th><th>Available</th><th>Reorder</th><th>Status</th></tr>' + rows + '</table>';
    } else if (type === 'procurement') {
      var rows = '';
      data.procurements.forEach(function(p) {
        rows += '<tr><td>' + p.product_name + '</td><td>' + p.supplier_name + '</td><td>' + p.quantity_received + '</td><td>$' + p.cost_price + '</td><td>' + p.branch + '</td></tr>';
      });
      reportData.innerHTML = '<h4>Procurement Report</h4><p>Orders: <strong>' + data.totalOrders + '</strong> | Cost: <strong>$' + data.totalCost + '</strong></p><table><tr><th>Product</th><th>Supplier</th><th>Qty</th><th>Cost</th><th>Branch</th></tr>' + rows + '</table>';
    }
  });
}