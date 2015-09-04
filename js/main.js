var $selectedBlock, selectedBlockVal, towerValue, blockIsSelected = false;

$(document).ready(function() {
  $('#fullpage').fullpage();
  $.fn.fullpage.setAllowScrolling(false);

  $('#info-btn').on('click', function(ev) {
    $.fn.fullpage.moveSectionDown();
  });

  $('#return-btn').on('click', function(ev) {
    $.fn.fullpage.moveSectionUp();
  });

  $('.win-text').hide();
  $('.tower-wrapper').on('click', function(ev) {
    $tower = $(this);
    if (($tower.children().length < 1) && !blockIsSelected) { // if tower empty and no block selected
      // do nothing
    } else if (($tower.children().length < 1) && blockIsSelected) { // else tower empty and block selected
      $(this).append($selectedBlock);
      $selectedBlock.removeClass('selected');
      blockIsSelected = false;
    } else if (($tower.children().length > 0) && blockIsSelected) { // else see if tower has allowed move
      selectedBlockVal = $selectedBlock.attr('data-value');
      selectedTowerVal = $tower.children().first().attr('data-value');
      $selectedBlock.toggleClass('selected');
      if (selectedBlockVal < selectedTowerVal) {
        $selectedBlock.prependTo($tower).removeClass('selected');
      }
      blockIsSelected = false;
      $selectedBlock = undefined;
    } else if (!blockIsSelected){ // otherwise grab block
      $selectedBlock = $(this).children().first(); // set selected block
      blockIsSelected = true;
      $selectedBlock.addClass('selected');
    } else if ($tower.children().first().attr('data-value') === $selectedBlock.attr('data-value')) {
      $tower.children().first().toggleClass('selected');
    }

    if ($('.tower-3').children().length === 4) {
      $('.win-text').show();
      console.log('win');
    }
  });
});
