<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AJAX Experiment - Populate Select List</title>
    <style>
    #tools {
        display: none;
        margin: 10px 0;
    }
    #option {
        width: 400px;
    }
    </style>
</head>
<body>
    <form action="data.php" method="get">
        <p>Select one topic:</p>
        <fieldset id="option">
        <input type="radio" name="options" value="html" /><label for="html">HTML</label><br />
        <input type="radio" name="options" value="css" /><label for="css">CSS</label><br />
        <input type="radio" name="options" value="js" /><label for="js">JS</label><br />
        </fieldset>
        <input type="submit" id="submitbutton" value="get list of tools" />
        <select id="tools"></select>
    </form>

    <!-- This is an experimental file. Inline scripts ARE NOT A GOOD PRATICE! Keep that in mind. -->
    <script>

        var http;

        // request
        function populateSelect() {

            var value;
            var inputs = this.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    value = inputs[i].value;
                    break;
                }
            }

            if (!http) {
                http = new XMLHttpRequest();
            }
            var url = 'sample.php?option=' + value;
            http.open('GET', url, true);
            http.onreadystatechange = getTools;
            http.send(null);

        }

        // response
        function getTools() {

            if(http.readyState == 4 && http.status == 200) {

                var select = document.getElementById('tools');
                select.length=0;
                var options = http.responseText.split(',');

                for (var i = 0; i < options.length; i++) {
                    select.options[select.length] = new Option(options[i], options[i]);
                }

                select.style.display='block';

            } else if (http.readyState == 4 && http.status != 200) {

                console.log('No items returned for request');

            }
        }

        window.onload=function() {
            document.getElementById('submitbutton').style.display='none';
            document.getElementById('option').onclick=populateSelect;
        }

    </script>
</body>
</html>
