<template>
<CityShowMore :item="city"></CityShowMore>
</template>

<script>
import { CityShowMore } from '../Components';
export default {
  name: "CityInfo",
  props: {
    city:''
  },
  components:{
    CityShowMore
  },
  data() {
    return {
    };
  },
}
</script>