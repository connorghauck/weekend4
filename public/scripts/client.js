$(function() {
//function to create todo list
    listCreate();
//add complete and delete event listeners
    $('form').on('submit', addItem);
    $('#theList').on('click', 'td', crossOff);
    $('#theList').on('click', 'button', deleteTask);
});




// empties out the toDoList and makes a call to get all items ont he list/ the list in general
function listCreate() {
    $('#theList').empty();
        $.ajax({
            type: 'GET',
            url: '/toDoList',
            success: appendList
        });
}





function appendList(response) {
    response.forEach(function(item) {
        var id = item.id;
        var task = item.task;
        var checked = item.markedcomplete;
        var $tr = $('<tr></tr>');
        var $deleteButton = $('<button class="delete">X</button>');
            $deleteButton.data('id', id);
                if (checked) {
                    $tr.append('<td class="' + checked + '" id="' + id + '"><s>' + task + '</s></td>');
                } else {
                    $tr.append('<td class="' + checked + '" id="' + id + '">' + task + '</td>');
                }
            $tr.append($deleteButton);
            $('#theList').append($tr);
    });
}




function addItem(event) {
    event.preventDefault();
        var newTask = $('input').serialize() + '&checkedOff=false';
        $('input').val('');
        console.log(newTask);
            $.ajax({
                type: 'POST',
                url: '/toDoList',
                data: newTask,
                success: listCreate
            });
}




function crossOff() {
    var id = $(this).attr('id');
    var checked = $(this).attr('class');
    var putObj = {
        'id': id,
        'checked': checked
        };
            $.ajax({
                type: 'PUT',
                url: '/toDoList/update',
                data: putObj,
                success: listCreate
            });
}




function deleteTask() {
    var id = $(this).data('id');
    if (confirm('Do you wish to delete this task?')) {
        $.ajax({
            type: 'DELETE',
            url: '/toDoList/' + id,
            success: listCreate
        });
    }
}
