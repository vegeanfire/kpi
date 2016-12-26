var app = angular.module("MyApp", [])
    .controller("FeedController", ["$scope", "$http" ,function($scope,  $http) {
        $scope.feeds = [];
      
        $http.get('http://localhost:8000/public/data.json')
              .success(function(data){

                $scope.test = "some text";
                $scope.feeds = data;
                console.log(data);
                var margin = {top: 20, right: 20, bottom: 70, left: 40},
                    width = 1200 - margin.left - margin.right,
                    height = 600 - margin.top - margin.bottom;

                // Parse the date / time
                var	parseDate = d3.time.format("%Y").parse;

                var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.05);

                var y = d3.scale.linear().range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(10);

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10);

                var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform",
                          "translate(" + margin.left + "," + margin.top + ")");


                          $scope.feeds.forEach(function(d) {
                              d.females = +d.females;
                              d.males = +d.males;
                          });

                  x.domain(data.map(function(d) { return d.females; }));
                  y.domain([0, d3.max(data, function(d) { return d.males; })]);

                  svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                    .selectAll("text")
                      .style("text-anchor", "end")
                      .attr("dx", "-.8em")
                      .attr("dy", "-.55em")
                      .attr("transform", "rotate(-90)" );

                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text("Value ($)");

                  svg.selectAll("bar")
                      .data(data)
                    .enter().append("rect")
                      .style("fill", "steelblue")
                      .attr("x", function(d) { return x(d.females); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return y(d.males); })
                      .attr("height", function(d) { return height - y(d.males); });
              })
              .error(function(){
                alert('fail');
                console.log(error + status);
              });

    }]);
