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

const createItem = (values) => {
  const result = $.ajax({
    async: false,
    url: 'api/items/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(values),
  });
  return result.responseJSON;
};

const updateItem = (id, values) => {
  const result = $.ajax({
    async: false,
    url: `api/items/${id}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(values),
  });
  return result.responseJSON;
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

const handleExport = () => {
  const { csv } = ($.ajax({
    async: false,
    url: 'api/export',
  })).responseJSON;

  const hiddenElement = document.createElement('a');
  hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
  hiddenElement.target = '_blank';
  hiddenElement.download = 'inventory.csv';
  hiddenElement.click();
};

const handleModalClose = () => {
  $('#modalEditSubmit, #modalCreateSubmit').attr('id', 'modalBaseSubmit');
  $('#modalEditSubmit, #modalCreateSubmit').attr('class', 'btn');
  $('#modalAlert').attr('hidden', true);
  $('#modalForm').trigger('reset');
  $('#modal').modal('hide');
};

const handleModalSubmit = (event) => {
  const isCreate = event.target.id === 'modalCreateSubmit';

  $('#modalAlert').attr('hidden', true);

  const name = $('#modalInputName').val();
  const description = $('#modalInputDescription').val();
  let quantity = $('#modalInputQuantity').val();

  let result;

  if (isCreate) {
    result = createItem({ name, description, quantity });
  } else {
    const id = $('#modalInputID').val();

    const original = ($.ajax({
      async: false,
      url: `api/items/${id}`,
    })).responseJSON;

    if (quantity === '') {
      quantity = 0;
    }

    const values = {
      name: name === original.name ? original.name : name,
      description: description === original.description ? original.description : description,
      quantity: quantity === original.quantity ? original.quantity : quantity,
    };

    result = updateItem(id, values);
  }

  if (!result.ok) {
    $('#modalAlert').attr('hidden', false);
    $('#modalAlert').text(result.message);
  } else {
    handleModalClose();
    handleRefresh();
  }
};

const handleEdit = (event) => {
  $('#modalBaseSubmit').attr('id', 'modalEditSubmit');
  $('#modalEditSubmit').attr('class', 'btn btn-primary');
  $('#modalInputID').attr('placeholder', 'ID');
  $('#modalEditSubmit').text('Save Changes');
  $('#modalTitle').text('Edit Item');

  const { id } = event.currentTarget.parentElement.parentElement;

  const values = ($.ajax({
    async: false,
    url: `api/items/${id}`,
  })).responseJSON.item;

  $('#modalInputID').val(values.id);
  $('#modalInputName').val(values.name);
  $('#modalInputDescription').val(values.description);
  $('#modalInputQuantity').val(values.quantity);
};

const handleDelete = (event) => {
  const { id } = event.currentTarget.parentElement.parentElement;
  deleteItem(id);
  handleRefresh();
};

$(document).ready(() => {
  populateTable();

  $('#buttonCreate').click(() => {
    handleCreate();
  });

  $('#buttonRefresh').click(() => {
    handleRefresh();
  });

  $('#buttonExport').click(() => {
    handleExport();
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
    handleModalSubmit(event);
  });
});
