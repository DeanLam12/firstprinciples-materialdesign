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
    <br>
    <div class="row">
      <div class="col">

        <div class="center hide" id="fpmedia">
          ${mediaHTML}
        </div>

        <ul class="collection">
          <li class="collection-item">
            ${phrase(2)}
          </li>
          <li class="collection-item">
            ${phrase(3)}
          </li>
          <li class="collection-item">
            ${phrase(4)}
          </li>
          <li class="collection-item">
            ${phrase(5)}
          </li>
          <li class="collection-item">
            ${phrase(8)}
          </li>
        </ul>

        <h5>
          ${phrase(9)}
        </h5>

        <table>
          <tbody>
            <tr>
              <td>
                ${phrase(10)}
              </td>
              <td>
                ${phrase(11)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(12)}
              </td>
              <td>
                ${phrase(13)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(14)}
              </td>
              <td>
                ${phrase(15)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(16)}
              </td>
              <td>
                ${phrase(17)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(18)}
              </td>
              <td>
                ${phrase(19)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(20)}
              </td>
              <td>
                ${phrase(21)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(22)}
              </td>
              <td>
                ${phrase(23)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(24)}
              </td>
              <td>
                ${phrase(25)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(26)}
              </td>
              <td>
                ${phrase(27)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(28)}
              </td>
              <td>
                ${phrase(29)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(30)}
              </td>
              <td>
                ${phrase(31)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(32)}
              </td>
              <td>
                ${phrase(33)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(34)}
              </td>
              <td>
                ${phrase(35)}
              </td>
            </tr>
            <tr>
              <td>
                ${phrase(36)}
              </td>
              <td>
                ${phrase(37)}
              </td>
            </tr>
          </tbody>
        </table>
        
        <h5>
          ${phrase(9)}
        </h5>

        <p>
          ${phrase(40)}
        </p>

        <ul>
          <li>${phrase(41)}: ${phrase(42)}</li>
          <li>${phrase(43)}: ${phrase(44)}</li>
          <li>${phrase(45)}: ${phrase(46)}</li>
        </ul>

      </div>
    </div>
  `;
  $('title').text(title);
  $(fp.view.containers.title).html(title);
  $(fp.view.containers.content).html(html);
  if (mediaHTML !== '') $('#fpmedia').removeClass('hide');
})();