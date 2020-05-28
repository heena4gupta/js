function show_subcategory(str, type) {
    // alert(str);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText);
            document.getElementById("subcat_name").innerHTML = this.responseText;

        }
    };
    if (type === 'search') {
        xmlhttp.open("GET", "getsubcategory_paper.php?q=" + str, true);
    }
    else {
        xmlhttp.open("GET", "getsubcategory.php?q=" + str, true);
    }
    xmlhttp.send();
}

function researcher_blog(subcat) {
    alert(subcat);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("title").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "getTitleAndDesc.php?subcat=" + subcat, true);
    xmlhttp.send();
}
function comments(blogid) {

    var comment = document.getElementById('comment-' + blogid).value;
    // alert(comment);
    var research_name = document.getElementById('research_name-' + blogid).value;
    if (comment !== '') {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               // alert();
                var output = this.responseText;
                var split_out = output.split('!@#$%^&');
               // alert(split_out);
                var outerdiv = $('<div/>', {
                    class: 'single_comment',
                    id: split_out[4]
                });
                var innerdiv = $('<div/>', {
                    "class": 'row'
                });
                var comment = $('<div/>', {
                    "class": 'col-sm-12',
                    "text": split_out[1]
                });
                var user = $('<div/>', {
                    "class": 'col-sm-9',
                    "text": split_out[2]
                });
                var dt = $('<div/>', {
                    "class": 'col-sm-3',
                    "text": split_out[3]
                });
                var final = innerdiv.append(comment, user, dt);
                var semi_final = outerdiv.append(innerdiv);

                // alert(semi_final);

                $('#new-comment-' + split_out[0]).append(semi_final);

            }
        };
        xmlhttp.open("GET", "getcomment.php?q=" + comment + "&blogid=" + blogid + "&research_name=" + research_name, true);
        xmlhttp.send();
    }
}

$(document).ready(function () {
    $("#reply").validate();
    $("#accordion").accordion();

});
function get_category(str) {
    if (str === 'Category') {
        document.getElementById('Category').style.display = 'block';
        document.getElementById('year').style.display = 'none';
        document.getElementById('course').style.display = 'none';
    }
    else if (str === 'year') {
        document.getElementById('Category').style.display = 'none';
        document.getElementById('year').style.display = 'block';
        document.getElementById('course').style.display = 'none';
    }
    else {
        document.getElementById('Category').style.display = 'none';
        document.getElementById('year').style.display = 'none';
        document.getElementById('course').style.display = 'block';
    }

}

function researcher_data() {
    var type = $('input[name="rd1"]:checked').val();
    var search = '';
    if (type === 'Category') {
        search = document.getElementById('category_name').value;
    }
    else if (type === 'year') {
        search = document.getElementById('getyear').value;
    }
    else {
        search = document.getElementById('course_name').value;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.responseText;
            document.getElementById('researchers').innerHTML = output;
        }
    };
    xmlhttp.open("GET", "get_researcher.php?type=" + type + "&val=" + search, true);
    xmlhttp.send();
}

function assignedapprovals(str) {
    var category = document.getElementById('category_name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.responseText;
            document.getElementById('approvals').innerHTML = output;
        }
    };
    xmlhttp.open("GET", "assignapproval.php?cat=" + category + "&subcat=" + str, true);
    xmlhttp.send();
}
function showpprovals(str) {
    var category = document.getElementById('category_name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.responseText;
            document.getElementById('approvals').innerHTML = output;
        }
    };
    xmlhttp.open("GET", "research_paper_guide.php?cat=" + category + "&subcat=" + str, true);
    xmlhttp.send();
}
var total = 0;
function approval_count(str) {
    //alert(document.getElementById(str.id).checked);
    if (document.getElementById(str.id).checked == true) {
        total = total + 1;
    }
    else {
        total = total - 1;
    }
    //alert(total);
    if (total > 5 || total < 3) {
        alert('there should be minimum 3 and maximum 5 guides');
    }
}
function showpapers(str) {
    var category = document.getElementById('category_name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.responseText;
            document.getElementById('paper').innerHTML = output;
        }
    };
    xmlhttp.open("GET", "get_papers.php?cat=" + category + "&subcat=" + str, true);
    xmlhttp.send();
}
function  researcher_detail(str) {
    var category = document.getElementById('category_name').value;
    var subcat_name = document.getElementById('subcat_name').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.responseText;
            document.getElementById('researcher').innerHTML = output;
        }
    };
    xmlhttp.open("GET", "get_researchers.php?cat=" + category + "&subcat=" + subcat_name + "&paper=" + str, true);
    xmlhttp.send();
}