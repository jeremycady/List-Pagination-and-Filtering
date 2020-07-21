/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelectorAll('li');
const countPerPage = 10;



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
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

showPage(studentList, 1);
appendPageLinks(studentList);

document.addEventListener('click', (event) => {
   if (event.target.tagName === 'A') {
      const currentActive = document.querySelector('.active');
      const links = document.querySelectorAll('a');
      const link = event.target;
      const page = link.textContent;

      currentActive.className = '';

      showPage(studentList, page);
      
      for (let i=1; i<=links.length; i++) {
         if (i == page) {
            link.className = 'active';
         }
      }
   }
});

// Remember to delete the comments that came with this file, and replace them with your own code comments.