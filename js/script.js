document.addEventListener('DOMContentLoaded', () => {
   /***
      Global variables - 
      studentList grabs students
      countPerPage is the number of students shown per page
   ***/ 
   const studentList = document.querySelectorAll('li');
   const countPerPage = 10;

   /*** 
      showPage takes a list of students and a page number and prints
      the page of students requested
   ***/  
   const showPage = (list, page) => {
      const startIndex = (page * countPerPage) - countPerPage;
      const endIndex = page * countPerPage;
      const ul = document.querySelector('.student-list');

      ul.innerHTML = '';

      if (list.length === 0) {
         const div = document.createElement('div');
         div.style.fontStyle = 'italic';
         div.style.backgroundColor = 'tomato';
         div.style.padding = '10px'
         const h4 = document.createElement('h4');
         
         h4.textContent = 'Your query returns no results';
         div.appendChild(h4);
         ul.appendChild(div);
      } else {
         for (let i=0; i<list.length; i++) {
            if (i >= startIndex && i < endIndex) {
               const li = list[i];
               ul.appendChild(li);
            }
         }
      }
   }

   // update the student list based on search query
   const updateList = () => {
      const list = studentList;
      const input = document.querySelector('input');
      const value = input.value;
      if (value.length > 0) {
         const newList = [];
         for (let i=0; i<list.length; i++) {
            const li = list[i];
            const div = li.firstElementChild;
            const img = div.firstElementChild;
            const h3 = img.nextElementSibling;

            if (h3.textContent.includes(input.value)) {
               newList.push(li);
            }
         }
         return newList;
      } else {
         return studentList;
      }
   }

   // create page links on initial and search
   const createPageLinks = (numberOfPages, ul) => {
      for (let i=1; i<=numberOfPages; i++) {
         const li = document.createElement('li');
         const a = document.createElement('a');

         if (i === 1) {
            a.className = 'active';
         }

         a.href = '#';
         a.textContent = `${i}`;
         ul.appendChild(li);
         li.appendChild(a);
      }
   }

   //  appendPageLinks adds page links to the bottom of the page
   const appendPageLinks = (list) => {
      const numberOfPages = Math.ceil(list.length / countPerPage)
      const pageDiv = document.querySelector('.page');
      const paginationDiv = document.createElement('div');
      const ul = document.createElement('ul');

      paginationDiv.className = 'pagination';
      pageDiv.appendChild(paginationDiv);
      paginationDiv.appendChild(ul);

      createPageLinks(numberOfPages, ul);
   }

   // update page links given the a new list length
   const updatePageLinks = (list) => {
      const numberOfPages = Math.ceil(list.length / countPerPage)
      const paginationDiv = document.querySelector('.pagination');
      const ul = paginationDiv.firstElementChild;

      ul.innerHTML = '';

      createPageLinks(numberOfPages, ul);
   }

   // add search input
   const searchInput = () => {
      const header = document.querySelector('.page-header');
      const div = document.createElement('div');
      const input = document.createElement('input');
      
      input.placeholder = 'Search for Students...';
      div.className = 'student-search';

      div.appendChild(input);
      header.appendChild(div);
   }

   // call the initial functions to begin
   showPage(studentList, 1);
   appendPageLinks(studentList);
   searchInput();

   /***
      listens for a click on page links
      returns the page clicked
      updates 'active' link
   ***/
   document.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
         const currentActive = document.querySelector('.active');
         const links = document.querySelectorAll('a');
         const link = event.target;
         const page = link.textContent;
         const list = updateList();

         currentActive.className = '';

         showPage(list, page);
         
         for (let i=1; i<=links.length; i++) {
            if (i === parseInt(page)) {
               link.className = 'active';
            }
         }
      }
   });

   // listen for keyup in search and update pages  
   document.addEventListener('keyup', (event) => {
      if (event.target.tagName === 'INPUT') {
         const list = updateList();
         showPage(list,1);
         updatePageLinks(list);
      } 
   });
});