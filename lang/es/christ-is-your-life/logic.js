(function(){
  const data = $(fp.view.content);
  const phrase = function(phraseID) {
    const phraseObj = $(data).find('phrase[id=' + phraseID + ']');
    const phraseHTML = fp.phrase(phraseObj);
    return phraseHTML;
  };
  const key = data.find('content')[0].attributes['key'].value;
  const title = phrase(1);
  let mediaHTML = '';
  const media = function() {
    const mediaObj = $(data).find('media');
    mediaHTML = fp.media(mediaObj);
  };
  media();
  const html = `
    <link rel="stylesheet" type="text/css" href="../../../css/the-church.css">
    <div class="row fpmodule fpmodule_${key}">
      <div class="col xl10 offset-xl1 l8 offset-l2 m8 offset-m2 s12">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <p>
          <strong>${phrase(2)}</strong>
        </p>

        <ol>
          <li>${phrase(3)}
            <ol>
              <li>${phrase(4)}</li>
              <li>${phrase(5)}</li>
            </ol>
          </li>
          <li>${phrase(6)}</li>
        </ol>

        <br>

        <ol>
          <li>${phrase(7)}
            <ol>
              <li>${phrase(8)}</li>
              <li>${phrase(9)}</li>
              <li>${phrase(10)}</li>
            </ol>
          </li>
          <li>${phrase(11)}
            <ol>
              <li>${phrase(12)}</li>
              <li>${phrase(13)}</li>
              <li>${phrase(14)}</li>
            </ol>
          </li>
          <li>${phrase(15)}
            <ol>
              <li>${phrase(16)}</li>
              <li>${phrase(17)}</li>
              <li>${phrase(18)}</li>
              <li>${phrase(19)}</li>
              <li>${phrase(20)}</li>
              <li>${phrase(21)}</li>
            </ol>
          </li>
          <li>${phrase(22)}
            <ol>
              <li>${phrase(23)}</li>
              <li>${phrase(24)}</li>
              <li>${phrase(25)}</li>
              <li>${phrase(26)}</li>
              <li>${phrase(27)}</li>
              <li>${phrase(28)}</li>
            </ol>
          </li>
        </ol>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();
