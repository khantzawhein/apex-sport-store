document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggler = document.getElementById('sidebar_toggler');
    const sidebarContainer = document.getElementById('sidebar');

    sidebarToggler.addEventListener('click', function() {
      sidebarContainer.classList.toggle('d-none');
    });
});