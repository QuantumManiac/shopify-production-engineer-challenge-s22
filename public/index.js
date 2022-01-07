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
                    <button type="button" class="btn btn-primary button-edit" title="Edit Item"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-danger button-delete" title="Delete Item"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>            
    `);
        });
      }
    },
  });
};

$(document).ready(() => {
  populateTable();

  $('.button-create').click((event) => {
    console.log(event);
  });

  $('.button-refresh').click(() => {
    populateTable();
  });
});
