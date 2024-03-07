const Swal = require('sweetalert');

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

 function deleteCategory() {
      console.log('delete category');
        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this category!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your category has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your category is safe!");
            }
        });
    }

