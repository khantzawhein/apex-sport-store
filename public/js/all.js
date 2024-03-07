document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggler = document.getElementById('hamburger-menu');
    const sidebarContainer = document.getElementById('list-group-container');

    sidebarToggler.addEventListener('click', function() {
      sidebarContainer.classList.toggle('d-none');
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const deleteCategory = document.getElementById('deleteCategory');
  deleteCategory.addEventListener('click', deleteCategory);
});


