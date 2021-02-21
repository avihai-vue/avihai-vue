<template>
  <div class="table-class">
      <slot/>
  </div>
</template>

<script>
export default {
  name: 'prettyTable',
};
</script>

<style scoped>
.table-class {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table-class td, .table-class th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-class tr:nth-child(even){background-color: #f2f2f2;}

.table-class tr:hover {background-color: #ddd;}

.table-class th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
