let drop_btns = document.querySelectorAll('.drop_menu_btn');
drop_btns.forEach((drop_btn)=>{drop_btn.addEventListener('click', (e) => drop_menu_toggle(e))});

function drop_menu_toggle(e) {

  const contents = document.querySelectorAll('.drop_menu_content');
  const id = e.target.id.split('_').at(-1);
  contents.forEach((content) => {
    if (content.id !== `drop_menu_content_${id}`) {
        content.classList.remove('drop_menu_show');
    }
});
  let content = document.getElementById(`drop_menu_content_${id}`);
  content.classList.toggle('drop_menu_show');
}