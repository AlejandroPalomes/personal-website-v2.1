<template>
  <div class="project__container mb-5 d-flex flex-column flex-xl-row justify-content-between align-items-center align-items-xl-start">
    <div class="order-1 order-xl-1 project__title mb-4 mb-xl-0 d-flex align-items-center justify-content-center">
        <span>{{project.title}}</span>
    </div>
    <div class="order-3 order-xl-2 project__description ps-0 ps-xl-5 mx-0 mx-xl-5">
        <span class="d-block">{{project.description}}<br><br>
            <span v-bind:key="project.ID + '-' + tech.name+'-Tech'" v-for="(tech, index) in project.technologies" >{{tech.name}}
              <span v-if="(index + 1) !== project.technologies.length"> | </span>
            </span>
        </span>
        <div class="mx-auto mt-3">
          <a v-if="project.repo" :href="project.repo" class="me-2">
            <svg height="25pt"  width="25pt" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
              c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
              c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
              c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
              c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
              c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
              c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
              c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
              c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"/>
            </svg>
          </a>
            <a v-if="project.preview" :href="project.preview">
              <svg height="25pt"  width="25pt" viewBox="0 0 488.9 488.9" xmlns="http://www.w3.org/2000/svg">
                <path d="M238.9,160.3c-42,2.6-76,36.7-78.6,78.6c-3.2,50.9,38.8,92.8,89.6,89.6c41.9-2.7,75.9-36.7,78.6-78.6
                    C331.7,199,289.8,157.1,238.9,160.3z M289.8,247.3c-1.5,22.7-19.8,41-42.4,42.4c-27.4,1.7-50-20.8-48.2-48.2
                    c1.4-22.6,19.8-40.9,42.4-42.4C268.9,197.4,291.6,219.9,289.8,247.3z"/>
                <path d="M244.4,0C109.4,0,0,109.4,0,244.4s109.4,244.4,244.4,244.4s244.4-109.4,244.4-244.4S379.4,0,244.4,0z M244.4,363.9
                    c-76.6,0-146-41.9-197.3-110c-4.2-5.6-4.2-13.4,0-18.9c51.2-68.1,120.7-110,197.3-110s146,41.9,197.3,110c4.2,5.6,4.2,13.4,0,18.9
                    C390.5,322,321,363.9,244.4,363.9z"/>
              </svg>
            </a>
        </div>
    </div>
    <img class="order-1 order-xl-3 mb-5 mb-xl-0 project__image" :src="`https://res.cloudinary.com/hcqy9e1vc/image/upload/v1604369233/projects/covers/project-${project.ID}.png`" :alt="`${project.title} cover`">
  </div>
</template>

<script>
    export default {
        name: 'projectContainer',
        props: ['project'],
    }
</script>
