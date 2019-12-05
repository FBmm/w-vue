<template>
    <div>
        <OpMultiSelect :multiple="multiple" :group="group" :data="data" :showSelectedCount="true" :selected="['00','02','11']" @onClose="showData" ></OpMultiSelect>
    </div>
</template>
<script>
import OpMultiSelect from "@/@ang/MultiSelect"
export default {
    name: 'multiSelectDemo',
    components: {OpMultiSelect},
    data() {
        const res = {
            multiple: true,
            group: true,
            data: []
        }

        var labels = ['未归档','已归档'];
        for(let i = 0; i < labels.length;i++) {
            res.data.push({
                label: labels[i],
                options: []
            });
            for(let j = 0;j<10;j++) {
                res.data[i].options.push({
                    label: `${labels[i]}迭代${j}`,
                    value: `${i}${j}`
                })
            }
        }
        return res;
    },
    methods: {
        showData(val) {
            console.log(val)
        },
    }
}
</script>