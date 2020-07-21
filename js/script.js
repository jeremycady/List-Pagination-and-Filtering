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
      const ul = document.querySelector('ul');

      ul.innerHTML = '';
   
      for (let i=0; i<list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            const li = list[i];
            ul.appendChild(li);
         }
      }
   }

   /*** 
      appendPageLinks adds page links to the bottom of the page
   ***/
   const appendPageLinks = (list) => {
      const numberOfPages = Math.ceil(list.length / countPerPage)
      const pageDiv = document.querySelector('.page');
      const paginationDiv = document.createElement('div');
      const ul = document.createElement('ul');

      paginationDiv.className = 'pagination';
      pageDiv.appendChild(paginationDiv);
      paginationDiv.appendChild(ul);

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

   // call the initial page and add page links
   showPage(studentList, 1);
   appendPageLinks(studentList);

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

         currentActive.className = '';

         showPage(studentList, page);
         
         for (let i=1; i<=links.length; i++) {
            if (i === parseInt(page)) {
               link.className = 'active';
            }
         }
      }
   });
});