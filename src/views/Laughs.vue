<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Pie"
        >
          <h4 class="title font-weight-light">Laughs count</h4>
          <p class="category font-weight-light">
            <span class="green--text">{{ dailySalesChart.data.labels[0] }}</span>&nbsp;wins in number of laughs written
          </p>
          <p class="category font-weight-light">
            <span class="red--text">{{ dailySalesChart.data.labels[dailySalesChart.data.labels.length - 1] }}</span>&nbsp;looses in number of laughs written
          </p>

          <template slot="actions">
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
      <material-card
        color="orange"
        title="Laughs Stats"
        text="Ranking of number of laughs"
      >
        <v-data-table
          :headers="headersPodium"
          :items="podiumItems"
          hide-actions
        >
          <template
            slot="headerCell"
            slot-scope="{ header }"
          >
            <span
              class="font-weight-light text-warning text--darken-3"
              v-text="header.text"
            />
          </template>
          <template
            slot="items"
            slot-scope="{ index, item }"
          >
            <td>{{ item.position }}</td>
            <td>{{ item.participant }}</td>
            <td>{{ item.laughs }}</td>
            <td>~{{ item.percentage }}%</td>
          </template>
        </v-data-table>
      </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { getLaughs } from '../api/generateStats';

export default {
  data () {
    return {
      headersPodium: [
        {
          sortable: false,
          text: 'Position',
          value: 'position'
        },
        {
          sortable: false,
          text: 'Participant',
          value: 'participant'
        },
        {
          sortable: false,
          text: 'Laughs',
          value: 'laughs'
        },
        {
          sortable: false,
          text: 'Percentage',
          value: 'percentage'
        },
      ],
      dailySalesChart: {
        data: {
          labels: [],
          series: []
        },
        options: {
          chartPadding: 30,
          labelOffset: 50,
          labelDirection: 'explode'
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: [],
          series: []
        },
        options: {}
      },
    }
  },
  async mounted() {
    const { series, labels } = getLaughs();
    this.dailySalesChart.data.labels = labels;
    this.dailySalesChart.data.series = series;
  },
  computed: {
    ...mapState(['chatContent']),
    totalLaughs() {
      return this.dailySalesChart.data.series.reduce((acum, e) => {
        return acum + e;
      }, 0);
    },
    podiumItems() {
        return this.dailySalesChart.data.labels.map((e, i) => {
          const qty = this.dailySalesChart.data.series[i];
          return {
            position: i + 1,
            participant: e,
            laughs: qty,
            percentage: (qty * 100 / this.totalLaughs).toFixed(2),
          }
        });
    },
  },
}
</script>
<style>
.ct-label {
  color: white!important;
}
</style>
