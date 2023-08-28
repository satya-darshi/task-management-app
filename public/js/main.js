// jshint esversion:8

// background animation
window.onload = function() {
  Particles.init({
    selector: '.background',
    connectParticles: true,
    color: '#f53676',
    responsive: [
    {breakpoint: 700,
      options: {
        maxParticles: 100,
        }
      },
      {breakpoint: 500,
      options: {
        maxParticles: 50,
      }
    }
    ]
  });
};

$(document).ready(function() {
  if($('h2').text() == 'YOUR ACCOUNT') {
    $('.hero').addClass('user-bg');
  }
});

// logout
$(document).ready(function() {
  if($('.signup-btn').text() == 'Sign Out') {
    $('.signup-btn').attr('type', 'submit');
    }
});

// validation for registration
$.validator.addMethod("alphanumeric", function(value, element) {
	return this.optional(element) || /^[\w.]+$/i.test(value);
}, "Letters, numbers, and underscores only please");

$(document).ready(function () {
    $('.register-form').validate({
        rules: {
            name: {
                required: true,
                lettersonly: true
            },
            email: {
                required: true,
                email: true,
            },
            newPassword: {
                required: true,
                minlength: 7,
                alphanumeric: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#password'
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                lettersonly: "Name should contain only letters"
            },
            newPassword: {
              required: "Please enter a password.",
              minlength: "Your password must be at least 7 characters and contain numbers and letters.",
              alphanumeric: "Your password must be at least 7 characters and contain numbers and letters."
            },
            confirmPassword: {
              equalTo: "Passwords must match."
            },
            email: {
              required: "Please enter a valid email address.",
              email: "Please enter a valid email address."
            }
        },
    });
});

// change user data
$(document).ready(function($) {
    $('.data-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
            }
        },
        messages: {
            email: {
              required: "Please enter a valid email address.",
              email: "Please enter a valid email address."
            }
        },
    });
    });

  $('.data-form').on('submit', (e) => {
    e.preventDefault();
    fetch('/users/me', {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: $('.name').val(),
        email: $('.email').val(),
      })
    }).then((response) => {
        $('h2').after('<p class="incorrect center">Account successfully updated!</p>');
    });
  });

// change password
$(document).ready(function($) {
    $('.password-form').validate({
        rules: {
            newPassword: {
                required: true,
                minlength: 7,
                alphanumeric: true
            },
            confirmPassword: {
                required: true,
                equalTo: '#newPassword'
            }
        },
        messages: {
            newPassword: {
              required: "No password specified.",
              minlength: "Your new password must be at least 7 characters and contain numbers and letters.",
              alphanumeric: "Your new password must be at least 7 characters and contain numbers and letters."
            },
            confirmPassword: {
              equalTo: "Passwords must match."
            }
        },
      });
    });

$('.password-form').on('submit', (e) => {
  e.preventDefault();
  fetch('/users/me', {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      password: $('.new-password').val(),
    })
  }).then((response) => {
      $('h3').after('<p class="incorrect center">Password successfully updated!</p>');
      $('.password-form input').val('');
  });
});

// delete account
$('.delete-account').on('submit', (e) => {
  e.preventDefault();
  fetch('/tasks', {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
  }
  }).then((response) => {
    console.log(response);
  });
  fetch('/users/me', {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
  }
  }).then((response) => {
      window.location= '/';
    });
  });

// show tasks
let checkbox = '';
let html = '';

$(document).ready(function() {
  fetch('/tasks').then((response) => {
      response.json().then((tasks) => {
        tasks.forEach((task) => {
          if(task.completed == false) {
            checkbox = '<span class="far fa-square unchecked"></span>';
          } else {
            checkbox = '<span class="far fa-check-square checked"></span>';
          }
          html = `<div class="item task-item">
            <form class="task">
              ${checkbox}
              <p class="edit-task" contenteditable="true" data-id="${task._id}">${task.description}</p>
            </form>
            <i class="far fa-trash-alt"></i>
          </div>
         `;
        $('.newItem').before(html);
        if($('.far').hasClass('checked')) {
          $('.checked').parent().find('.edit-task').addClass('done');
        }
      });
      }
    );
  });
});

// add new tasks
$('.newItem').on('submit', (e) => {
  e.preventDefault();
  fetch('/tasks', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      description: $('.newTask').val(),
      completed: false
    })
  }).then((response) => {
    response.json().then((tasks) => {
      html = `<div class="item task-item">
          <form class="task">
            <span class="far fa-square unchecked"></span>
            <p contenteditable="true" type="text" class="edit-task" data-id="${tasks[(tasks.length)-1]._id}">${tasks[(tasks.length)-1].description}</p>
          </form>
          <i class="far fa-trash-alt"></i>
        </div>
       `;
      $('.newItem').before(html);
      $('.newTask').val('').css('height', '40px');
      }
    );
  });
});

// edit task
$(document).on('keypress', '.task', function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    fetch(`/tasks/${$(e.target).data('id')}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        description: $(e.target).text()
      })
    }).then((response) => {
    });
    }
});

// check task
$(document).on('click', '.unchecked', (e) => {
  e.preventDefault();
  fetch(`/tasks/${$(e.target).parent().find('.edit-task').data('id')}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      completed: true,
    })
  }).then((response) => {
      $(e.target).removeClass('fa-square').addClass('fa-check-square checked').removeClass('unchecked');
      $(e.target).parent().find('.edit-task').addClass('done');
  });
});

// uncheck task
$(document).on('click', '.checked', (e) => {
  e.preventDefault();
  fetch(`/tasks/${$(e.target).parent().find('.edit-task').data('id')}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      completed: false,
    })
  }).then((response) => {
      $(e.target).removeClass('fa-checked-square').addClass('fa-square unchecked').removeClass('checked');
      $(e.target).parent().find('.edit-task').removeClass('done');
  });
});

// sorting, filtering, pagination
let countQuery = '';
let sortQuery = '';
let filterQuery = '';

function query() {
  if ($('.count-dropdown').val() == '5') {
    countQuery = '?limit=5';
  } else if ($('.count-dropdown').val() == '10') {
    countQuery = '?limit=10';
  } else if ($('.count-dropdown').val() == '20') {
    countQuery = '?limit=20';
  } else {
    countQuery = '';
  }
  if ($('.sort-dropdown').val() == 'desc') {
    sortQuery = '&sortBy=createdAt:desc';
  } else if ($('.sort-dropdown').val() == 'asc') {
    sortQuery = '&sortBy=createdAt:asc';
  } else {
    sortQuery = '';
  }
  if ($('.filter-dropdown').val() == 'comp') {
    filterQuery = '&completed=true';
  } else if ($('.filter-dropdown').val() == 'incomp') {
    filterQuery = '&completed=false';
  } else {
    filterQuery = '';
  }
}

$('.count').on('change', (e) => {
  query();
  fetch(`/tasks/${countQuery}${sortQuery}${filterQuery}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    },
  }).then((response) => {
    response.json().then((tasks) => {
      $('.task-item').remove();
      tasks.forEach((task) => {
        if(task.completed == false) {
          checkbox = '<span class="far fa-square unchecked"></span>';
        } else {
          checkbox = '<span class="far fa-check-square checked"></span>';
        }
        html = `<div class="item task-item">
          <form class="task">
            ${checkbox}
            <p contenteditable="true" class="edit-task" data-id="${task._id}">${task.description}</p>
          /form>
          <i class="far fa-trash-alt"></i>
        </div>
       `;
      $('.newItem').before(html);
      if($('.far').hasClass('checked')) {
        $('.checked').parent().find('.edit-task').addClass('done');
      } else {
        $('.checked').parent().find('.edit-task').removeClass('done');
      }
    });
    }
  );
  });
});

$('.sort').on('change', (e) => {
  query();
  fetch(`/tasks/?${sortQuery}&${filterQuery}&${countQuery}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    },
  }).then((response) => {
    response.json().then((tasks) => {
      $('.task-item').remove();
      tasks.forEach((task) => {
        if(task.completed == false) {
          checkbox = '<span class="far fa-square unchecked"></span>';
        } else {
          checkbox = '<span class="far fa-check-square checked"></span>';
        }
        html = `<div class="item task-item">
          <form class="task">
            ${checkbox}
            <p contenteditable="true" class="edit-task" data-id="${task._id}">${task.description}</p>
          /form>
          <i class="far fa-trash-alt"></i>
        </div>
       `;
      $('.newItem').before(html);
      if($('.far').hasClass('checked')) {
        $('.checked').parent().find('.edit-task').addClass('done');
      } else {
        $('.checked').parent().find('.edit-task').removeClass('done');
      }
    });
    }
  );
  });
});

$('.filter').on('change', (e) => {
  query();
  fetch(`/tasks/?${filterQuery}&${sortQuery}&${countQuery}`, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    },
  }).then((response) => {
    response.json().then((tasks) => {
      $('.task-item').remove();
      tasks.forEach((task) => {
        if(task.completed == false) {
          checkbox = '<span class="far fa-square unchecked"></span>';
        } else {
          checkbox = '<span class="far fa-check-square checked"></span>';
        }
        html = `<div class="item task-item">
          <form class="task">
            ${checkbox}
            <p contenteditable="true" class="edit-task" data-id="${task._id}">${task.description}</p>
          /form>
          <i class="far fa-trash-alt"></i>
        </div>
       `;
      $('.newItem').before(html);
      if($('.far').hasClass('checked')) {
        $('.checked').parent().find('.edit-task').addClass('done');
      } else {
        $('.checked').parent().find('.edit-task').removeClass('done');
      }
    });
    }
  );
  });
});

// delete tasks
$(document).on('click', '.fa-trash-alt', (e) => {
  console.log($(e.target).parent());
  fetch(`/tasks/${$(e.target).parent().find('.edit-task').data('id')}`, {
    method: 'DELETE',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      completed: false,
    })
  }).then((response) => {
    $(e.target).parent().remove();
  });
});

// autosize textarea
$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});
