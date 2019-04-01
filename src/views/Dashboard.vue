<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap v-if="!chatContent">
      <v-flex
        xs4
        md4
        lg4
        offset-xs4
      >
        <material-card class="v-card-profile" width="100%">
          <v-avatar
            slot="offset"
            class="mx-auto d-block"
            size="130"
          >
            <img
              src="/img/vuetifylogo.png"
            >
          </v-avatar>
          <v-card-text class="text-xs-center" >
            <h6 class="category text-gray font-weight-thin mb-3">Whatsapp Group Stats</h6>
            <h4 class="card-title font-weight-light">You didn't upload any file yet.</h4>
            <v-btn
              color="success"
              round
              class="font-weight-light"
              to="/upload"
            >Upload Conversation</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
    <v-layout wrap v-else>
      <v-flex
        sm6
        xs12
        md3
        lg3
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="File Size"
          :value="chatSizeInKB"
          small-value="KB"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        lg3
      >
        <material-stats-card
          color="green"
          icon="mdi-file-word-box"
          title="Number of words"
          :value="qtyWords"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        lg3
      >
        <material-stats-card
          color="green"
          icon="mdi-alphabetical"
          title="Number of letters"
          :value="qtyLetters"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex
        xs12
        sm6
        md3
        lg3
      >
        <material-stats-card
          color="green"
          icon="mdi-emoticon"
          title="Number of laughs"
          :value="qtyLaughs"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Participants"
          text="Participants of whatsapp group"
        >
          <v-data-table
            :headers="headers"
            :items="stats"
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
              slot-scope="{ item }"
            >
              <td>{{ item.participant }}</td>
              <td class="text-xs-right">{{ item.participations }}</td>
              <td class="text-xs-right">{{ item.letters }}</td>
              <td class="text-xs-right">{{ item.laughs }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { getParticipations, getLaughs, getWordsCount, getLettersCount, getLaughsCount, getStats } from '../api/generateStats';

export default {
  data () {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38]
          ]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: [],
          series: []
        },
        options: {}
      },
      emailsSubscriptionChart: {
        data: {
          labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

          ]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0]
              }
            }
          }]
        ]
      },
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'participant'
        },
        {
          sortable: false,
          text: 'No. Participations',
          value: 'participations',
          align: 'right'
        },
        {
          sortable: false,
          text: 'No. Letters',
          value: 'letters',
          align: 'right'
        },
        {
          sortable: false,
          text: 'No. Laughs',
          value: 'laughs',
          align: 'right'
        }
      ],
    }
  },
  computed: {
    ...mapState(['groupName', 'chatContent', 'chatSize']),
    stats() {
      return getStats();
    },
    chatSizeInKB() {
      return ((this.chatSize || 0) /1024).toFixed(2);
    },
    qtyWords() {
      return getWordsCount().toString();
    },
    qtyLetters() {
      return getLettersCount().toString();
    },
    qtyLaughs() {
      return getLaughsCount().toString();
    },
  },
}
</script>
<style>
.ct-label {
  color: white!important;
}
</style>
