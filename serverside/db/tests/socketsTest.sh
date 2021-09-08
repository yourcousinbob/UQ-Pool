if ! ttab -h &> /dev/null
then
echo ttab not installed
echo install ttab with: npm install -g ttab
echo "if you don't have npm installed, brew install npm"
exit 1
fi
declare -a arr=("44412341" "22325454" "12341234" "55334455" "66666666" "53432345")
for i in "${arr[@]}"
do
echo "connecting $i"
ttab python socketSingleBroadcast.py $i
done
