const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.smart-nav a');

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.smart-nav a[href="#${entry.target.id}"]`
                );

                if(activeLink){
                    activeLink.classList.add("active");
                }
            }
        });

    },
    {
        threshold: 0.4
    }
);

sections.forEach(section => {
    observer.observe(section);
});
