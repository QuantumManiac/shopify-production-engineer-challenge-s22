const populateTable = () => {
  $.ajax({
    url: 'api/items',
    success: (res) => {
      if (res.ok) {
        $('#inventory-table-data').empty();
        const { items } = res;
        items.forEach((item) => {
          $('#inventory-table-data').append(`    
            <tr id='${item.id}'>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>
                    <button type="button" class="btn btn-primary buttonEdit" title="Edit Item" data-bs-toggle="modal" data-bs-target="#modal"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger buttonDelete" title="Delete Item"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>            
    `);
        });
      }
    },
  });
};

const createItem = () => {

};

const updateItem = () => {

};

const deleteItem = (id) => {
  $.ajax({
    url: `api/items/${id}`,
    type: 'DELETE',
  });
};

const handleRefresh = () => {
  populateTable();
};

const handleCreate = () => {
  $('#modalBaseSubmit').attr('id', 'modalCreateSubmit');
  $('#modalCreateSubmit').attr('class', 'btn btn-success');
  $('#modalInputID').attr('placeholder', 'ID Assigned When Created');
  $('#modalCreateSubmit').text('Create');
  $('#modalTitle').text('Create New Item');
};

const handleModalClose = () => {
  $('#modalEditSubmit, #modalCreateSubmit').attr('id', 'modalBaseSubmit');
  $('#modalEditSubmit, #modalCreateSubmit').attr('class', 'btn');
  $('#modalForm').trigger('reset');
};

const handleModalSubmit = (isCreate, event) => {
  console.log(isCreate, event);
};

const handleEdit = (event) => {
  $('#modalBaseSubmit').attr('id', 'modalEditSubmit');
  $('#modalEditSubmit').attr('class', 'btn btn-primary');
  $('#modalInputID').attr('placeholder', 'ID');
  $('#modalEditSubmit').text('Save Changes');
  $('#modalTitle').text('Edit Item');
};

const handleDelete = (event) => {
  const { id } = event.target.parentElement.parentElement;
  deleteItem(id);
  populateTable();
};

$(document).ready(() => {
  populateTable();

  $('#buttonCreate').click(() => {
    handleCreate();
  });

  $('#buttonRefresh').click(() => {
    handleRefresh();
  });

  $('.modalCloseButton').click(() => {
    handleModalClose();
  });

  $('#inventory-table-data').on('click', 'button.buttonEdit', (event) => {
    handleEdit(event);
  });

  $('#inventory-table-data').on('click', 'button.buttonDelete', (event) => {
    handleDelete(event);
  });

  $('.buttonModalSubmit').click((event) => {
    handleModalSubmit(true, event);
  });
});
