const form = document.getElementById('product-form');
const tableBody = document.querySelector('#product-table tbody');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

// Fetch all products and display them
const fetchProducts = async () => {
    const res = await fetch('/products');
    const products = await res.json();
    tableBody.innerHTML = '';
    products.forEach(product => {
        addProductToTable(product);
    });
};

// Add a new product
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        supplier: document.getElementById('supplier').value,
        sales: document.getElementById('sales').value,
        price: document.getElementById('price').value,
        quantity: document.getElementById('quantity').value,
    };

    const res = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });

    const newProduct = await res.json();
    addProductToTable(newProduct);

    form.reset();
});

// Add product to the table
const addProductToTable = (product) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.supplier}</td>
        <td>${product.sales}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>
            <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
};

// Delete a product
const deleteProduct = async (id) => {
    await fetch(`/products/${id}`, {
        method: 'DELETE'
    });

    fetchProducts(); // Refresh the table
};

// Search for products
searchButton.addEventListener('click', async () => {
    const query = searchBar.value;
    const res = await fetch(`/products/search/${query}`);
    const products = await res.json();

    tableBody.innerHTML = '';
    products.forEach(product => {
        addProductToTable(product);
    });
});

// Initial fetch of products
fetchProducts();
