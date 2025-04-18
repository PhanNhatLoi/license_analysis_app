import ScreenHeader from '@components/headers/ScreenHeader';
import StatusBar from '@components/headers/StatusBar';
import {scaleW} from '@utils/dimensionUtil';
import {Box, ITheme, Text, useTheme, View, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

export default function DetailBeautyTips() {
  const theme = useTheme();
  const {t} = useTranslation();
  const styles = createStyles(theme);
  return (
    <View flex={1} style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary[500]} />
      <ScreenHeader
        title={t('Home.naturalBeautyTips')}
        backgroundColor="primary.500"
      />
      <ScrollView>
        <VStack px="4" my="2" space="2">
          <Box>
            <Text fontSize="lg" bold color="black">
              Cách chăm sóc da mặt hàng ngày với 8 bước cơ bản
            </Text>
            <Text color="black">
              Một làn da khỏe mạnh, trắng sáng và rạng rỡ luôn là ao ước của
              nhiều bạn khi chăm sóc da hiện nay. Tuy nhiên, da có khỏe đẹp hay
              không phụ thuộc rất nhiều vào cách chăm sóc da hàng ngày. Vì thế,
              bạn cần biết các bước skincare và chăm sóc sao cho phát huy hiệu
              quả tối ưu nhất. Vậy hãy cùng tìm hiểu 8 bước chăm da cơ bản để sở
              hữu ngay làn da mịn màng, tươi sáng và rạng rỡ nhé.
            </Text>
          </Box>
          <Box>
            <Text fontSize="md" bold>
              Vì sao cần chăm sóc da mặt hàng ngày?
            </Text>
            <Text color="black">
              Từ nhỏ đến khi lớn lên, da chúng ta phải tiếp xúc với rất nhiều
              các tác nhân gây hại như ánh nắng mặt trời, tia cực tím, khói bụi,
              hóa chất, độ ẩm và nhiệt độ cao. Hơn nữa, nhiều yếu tố bên trong
              cơ thể cũng khiến sức khỏe da giảm sút theo thời gian như do di
              truyền, thiếu hụt dinh dưỡng, rối loạn nội tiết tố, áp lực căng
              thẳng trong cuộc sống,... Những yếu tố này khiến da ngày càng bị
              tổn thương và nhạy cảm. Vì thế, cách chăm sóc da mặt hàng ngày là
              vô cùng cần thiết để bảo vệ sức khỏe da. Nếu da bạn không có quá
              nhiều vấn đề thì cũng cần chăm sóc để duy trì sức khỏe cho làn da.
              Còn nếu da bạn đã bị tổn thương như mụn, thâm, nám, sạm, tàn
              nhang,...thì càng phải chăm sóc chuyên sâu hơn để loại bỏ chúng,
              trả lại làn da khỏe mạnh.
            </Text>
          </Box>
          <Box>
            <Text fontSize="md" bold color="black">
              Cách chăm sóc da mặt với 8 bước chuẩn chuyên gia
            </Text>
            <Text color="black" bold>
              Bước 1: Tẩy trang cho da
            </Text>
            <Text color="black">
              Tẩy trang là bước vô cùng quan trọng trong quy trình skincare để
              có một làn da chắc khỏe, dù bạn là nam hay nữ. Những lớp bụi bẩn,
              sợi bã nhờn bám vào da cần được làm sạch mỗi ngày, tránh gây bít
              tắc lỗ chân lông dẫn đến hình thành các loại mụn trên mặt như mụn
              cám, mụn cơm,... như mụn bọc và các loại các loại mụn ở mũi, mụn ở
              quai hàm, mụn trứng cá, mụn bọc ở mũi khó điều trị. Bước tẩy trang
              này được áp dụng với quy trình dưỡng da ban đêm, vào ban ngày bạn
              có thể bỏ qua bước này và thực hiện các bước kế tiếp. Các sản phẩm
              tẩy trang phổ biến trên thị trường hiện nay có như nước tẩy trang,
              dầu tẩy trang, hay sữa rửa mặt kết hợp tẩy trang,.... Bạn có thể
              tùy chọn một loại phù hợp với da của mình. Lưu ý, nên mua bông tẩy
              trang mềm mịn, được sản xuất từ 100% thiên nhiên, dịu nhẹ, lành
              tính để tránh kích ứng và da được bảo vệ tốt nhất.
            </Text>
          </Box>
          <Text color="black" bold>
            Bước 2: Sử dụng sữa rửa mặt phù hợp
          </Text>
          <Text color="black">
            Các chuyên gia khuyên rằng nên rửa mặt 2 lần/ngày vào trước khi đi
            ngủ và ngay sau khi thức dậy. Rửa mặt vào buổi sáng giúp lấy đi bã
            nhờn và dầu thừa trên da, còn rửa mặt buổi tối giúp da thông thoáng,
            giảm nguy cơ tắc nghẽn lỗ chân lông và gây các vị trí mụn khó trị.
            Bạn nên phân biệt các loại da khác nhau để lựa chọn từng loại sữa
            rửa mặt phù hợp khác. Nếu bạn có làn da nhạy cảm hoặc da khô, hãy
            chọn loại sữa rửa mặt có tinh chất dưỡng ẩm. Bên cạnh đó bạn hoàn
            toàn có thể sử dụng các loại rửa mặt chuyên dụng cho làn da như sữa
            rửa mặt cho da dầu, sữa rửa mặt cho da dầu mụn nhạy cảm,... Sử dụng
            sữa rửa mặt tạo bọt nếu bạn có làn da nhờn và chọn sữa rửa mặt có
            thành phần Salicylic Acid/Azelaic Acid nếu da bạn bị mụn trứng cá do
            stress.
          </Text>
          <Text color="black" bold>
            Bước 3: Tẩy tế bào chết định kỳ
          </Text>
          <Text color="black">
            Các tế bào chết trên bề mặt da khiến da bị xỉn màu, sần sùi kém sức
            sống và ngăn chặn các dưỡng chất thấm sâu vào da. Việc tẩy tế bào
            chết định kỳ là vô cùng cần thiết để da hấp thụ các sản phẩm chăm
            sóc da tốt hơn. Từ đó giúp giảm tình trạng mặt nổi mụn đầu trắng,
            mụn trứng cá, mụn viêm và mụn ẩn, hạn chế bít tắc lỗ chân lông, giúp
            da trắng sáng và đều màu hơn. Tuy nhiên, việc tẩy da chết quá nhiều
            lần sẽ khiến lớp bảo vệ da bị yếu đi. Do đó, để việc tẩy tế bào chết
            có tác dụng tối ưu chỉ nên áp dụng với tần suất 1-2 lần/ tuần để
            loại bỏ lớp tế bào đã lão hóa, tái tạo tế bào da mới.
          </Text>
          <Text color="black" bold>
            Bước 4: Dùng toner/nước hoa hồng hoặc lotion
          </Text>
          <Text color="black">
            Sử dụng nước hoa hồng vào lúc nào? Sản phẩm toner/nước hoa
            hồng/toner pad và lotion được sử dụng ngay sau bước làm sạch da là
            một trong những cách chăm sóc da phổ biến hiện nay. Toner có kết cấu
            dạng lỏng giúp loại bỏ các bụi bẩn, dầu nhờn còn sót lại sau bước
            rửa mặt, giúp cân bằng độ pH và se khít lỗ chân lông. Lotion có kết
            cấu đặc hơn, được sử dụng như chất làm mềm da giúp giữ làn da không
            bị khô căng sau khi rửa mặt. Bạn chỉ cần lấy một lượng vừa đủ, thoa
            trực tiếp lên da hoặc thấm vào bông tẩy trang, vuốt nhẹ lên da từ
            trong da ngoài. Toner có cần thiết không? Tùy vào tình trạng và loại
            da bạn có thể lựa chọn cách sử dụng toner với các loại: toner cấp ẩm
            phù hợp với làn da như toner cho da dầu mụn, toner hoa cúc,....
          </Text>
          <Text color="black" bold>
            Bước 5: Sử dụng serum
          </Text>
          <Text color="black">
            Cách chăm sóc da hiệu quả tiếp theo là bước sử dụng serum. Để cải
            thiện cho làn da của bạn, đừng quên thêm serum vào quy trình dưỡng
            da mỗi ngày. Nếu bạn gặp phải tình trạng mụn ở má, thâm, da không
            đều màu,... có thể sử dụng một hoặc nhiều loại serum trị mụn, serum
            dưỡng trắng da mờ thâm, serum Vitamin C,... để giải quyết các vấn đề
            về da. Nên ưu tiên dùng serum dạng lỏng trước, sau đó mới đến dạng
            đặc. Hãy đảm bảo rằng không có chất nào phản ứng với nhau khi thoa
            lên da. Tuy nhiên, khi áp dụng cách trị mụn với các loại serum đặc
            trị chứa thành phần Retinol, Vitamin C, AHA và BHA chỉ nên sử dụng
            vào ban đêm vì những hoạt chất này khiến da trở nên nhạy cảm với ánh
            nắng mặt trời, nếu sử dụng vào ban ngày bạn phải thoa kem chống nắng
            để bảo vệ da tối ưu hơn. Đối với các sản phẩm chứa thành phần AHA,
            BHA hay Glycerin sau khi sử dụng trên da, bạn phải để yên trong vòng
            20 – 30 phút để giúp các hoạt chất hoạt động trước khi tiến hành các
            bước skincare tiếp theo.
          </Text>
          <Text color="black" bold>
            Bước 6: Sử dụng kem dưỡng mắt và dưỡng môi
          </Text>
          <Text color="black">
            Vùng mắt là nơi dễ xuất hiện tình trạng lão hóa nhất trên khuôn mặt.
            Vùng da này cũng thường bị bỏ qua trong quy trình chăm sóc da hằng
            ngày. Một loại kem mắt có công dụng dưỡng ẩm sẽ là lựa chọn tối ưu
            cho những bạn dưới 25 tuổi. Ở giai đoạn trên 25 tuổi, bên cạnh sử
            dụng loại dưỡng ẩm, bạn nên chọn các loại kem mắt có thêm thành phần
            chống lão hóa để giảm các nếp nhăn, bọng mắt, quầng thâm,... tại các
            vùng da nhạy cảm. Dưỡng môi cũng là một trong những cách chăm sóc da
            mặt cần thiết. Môi của bạn có thể rất dễ bị khô, thiếu nước vào mùa
            lạnh hoặc do các thành phần trong son gây khô và thâm môi. Ngoài
            việc cung cấp đủ nước cho cơ thể, bạn cũng cần thoa kem dưỡng ẩm môi
            mỗi ngày để giúp có được đôi môi hồng hào và mềm mịn.
          </Text>
          <Text color="black" bold>
            Bước 7: Dùng kem dưỡng ẩm
          </Text>
          <Text color="black">
            Cách dùng kem dưỡng ẩm là bước chăm sóc da mặt không nên bỏ qua
            trong quy trình skincare của bạn. Kem dưỡng ẩm giúp cho các tinh
            chất trước đó không bị bay hơi đồng thời cung cấp độ ẩm cần thiết
            cho da. Đối với những bạn da khô, khi thay đổi thời tiết thì kem
            dưỡng ẩm cho da với kết cấu đặc, chứa nhiều hoạt chất dưỡng ẩm sẽ là
            lựa chọn thích hợp. Người có da dầu thường không chú ý đến việc sử
            dụng các sản phẩm kem dưỡng ẩm vì lo lắng chúng sẽ khiến da dầu càng
            bóng nhờn hơn. Tuy nhiên, đây là cách nghĩ không đúng. Dù da của bạn
            thuộc loại da nào, kể cả da dầu thì cũng cần được dưỡng ẩm đầy đủ
            bằng kem dưỡng ẩm hoặc mặt nạ dưỡng ẩm vào buổi tối. Lời khuyên
            rằng, các bạn da dầu hoặc da hỗn hợp nên sử dụng kem dưỡng ẩm có
            dòng chữ Oil-Free (không chứa dầu). Đối với da nhạy cảm, bạn có thể
            sử dụng những sản phẩm kem dưỡng ẩm với các thành phần lành tính và
            không gây kích ứng trên da.
          </Text>
          <Text color="black" bold>
            Bước 8: Đắp mặt nạ dưỡng da
          </Text>
          <Text color="black">
            Đắp mặt nạ dưỡng da là cách chăm sóc da nhằm cung cấp độ ẩm và các
            dưỡng chất cần thiết, tạo điều kiện cho da phục hồi khỏe mạnh. Sau
            khi đắp, bạn sẽ cảm giác da mịn màng và mềm mại hơn. Bên cạnh đó, sử
            dụng mặt nạ cũng giúp thư giãn, giảm các căng thẳng mệt mỏi. Các
            loại mặt nạ có chiết xuất thiên nhiên không chỉ giúp làm dịu da mà
            còn có công dụng dưỡng ẩm hiệu quả, đem lại vẻ tươi tắn tức thì cho
            làn da của bạn. Nên đắp mặt nạ mấy lần 1 tuần? Nên sử dụng mặt nạ
            với tần suất 2 lần/tuần để chăm sóc da tốt nhất. Bạn có thể tham
            khảo và lựa chọn các loại mặt nạ dưỡng da phù hợp như mặt nạ đất
            sét, mặt nạ ngủ,... để chăm sóc da tối ưu hơn.
          </Text>
          <Text color="black" bold>
            Bước 9: Sử dụng kem chống nắng hàng ngày
          </Text>
          <Text color="black">
            Chăm sóc và bảo vệ da tối ưu không thể thiếu việc sử dụng kem chống
            nắng hàng ngày. Đây là cách chăm sóc da quan trọng mà bạn không nên
            bỏ qua. Nên biết cách cách bôi kem chống nắng và thoa kem chống nắng
            kể cả khi ở nhà và bất cứ khi nào ra ngoài để hạn chế tối đa tác
            động của tia UV lên da. Ngoài dùng kem chống nắng, cần mặc quần áo
            dài tay, đội nón để da tránh tiếp xúc với ánh mắt và bụi bẩn. Khi
            chọn kem chống nắng, hãy nhớ chọn loại phù hợp với làn da và loại
            chống nắng phổ rộng để bảo vệ da được tốt hơn.
          </Text>
          <Box>
            <Text fontSize="lg" bold color="black">
              Một số lưu ý khi chăm sóc da hàng ngày
            </Text>
            <Text color="black">
              Sau khi biết cách chăm sóc da mặt đúng cách chuẩn chuyên gia với 8
              bước cơ bản, bạn cũng nên biết một số lưu ý để chăm sóc da đạt
              hiệu quả như mong đợi và tránh những kích ứng khác dưới đây:
            </Text>
          </Box>
          <Text color="black">
            <Text color="black" bold>
              Chọn sản phẩm chăm sóc da phù hợp, thương hiệu uy tín:
            </Text>{' '}
            Từng loại da sẽ có những cách chăm sóc khác nhau. Xác định chính xác
            đặc điểm loại da của mình để chọn những sản phẩm chăm sóc da phù
            hợp. Để đảm bảo chất lượng, bạn nên chọn mua mỹ phẩm ở những thương
            hiệu uy tín, chất lượng, nguồn gốc rõ ràng với các thành phần an
            toàn, lành tính cho da khi sử dụng.
          </Text>
          <Text color="black">
            <Text color="black" bold>
              Uống nhiều nước:
            </Text>{' '}
            Thời tiết nắng nóng khiến cơ thể tiết nhiều mồ hôi và mất nước khiến
            làn da của bạn cũng mất đi độ ẩm cần thiết. Vì thế, nên uống 2 - 2.5
            lít nước mỗi ngày để bổ sung đủ nước cho cơ thể và duy trì làn da
            khỏe mạnh, căng mịn. Ngoài ra, nên uống thêm nhiều loại nước ép hoa
            quả, nước dừa, ăn các loại trái cây để hấp thụ thêm nhiều Vitamin
            khoáng chất cần thiết.
          </Text>
          <Text color="black">
            <Text color="black" bold>
              Không lạm dụng mỹ phẩm chăm sóc da:
            </Text>{' '}
            Rất nhiều bạn nghĩ rằng da mình có thể hấp thụ tất cả các loại mỹ
            phẩm đắt tiền và sẽ không gây hại. Nhưng trên thực tế, kết cấu da
            của mỗi người là khác nhau. Việc bạn sử dụng hàng loạt các loại mỹ
            phẩm cùng lúc có thể sẽ gây kích ứng, da mặt bị ngứa và các phản ứng
            không mong muốn khác.
          </Text>
          <Text color="black">
            <Text color="black" bold>
              Chế độ ăn uống, nghỉ ngơi và tập luyện phù hợp:
            </Text>{' '}
            Cần hạn chế ăn các thức ăn dầu mỡ, thức ăn nhanh, đồ ăn nhiều đường.
            Thay vào đó, bổ sung nhiều loại trái cây, rau xanh vào thực đơn hàng
            ngày để nạp vitamin khoáng chất cho cơ thể. Ngủ đủ giấc, giữ tinh
            thần thoải mái cũng sẽ giúp da tươi tắn. Tập luyện thể thao không
            chỉ tốt cho sức khỏe, vóc dáng mà còn mang đến cho bạn một làn da
            khỏe mạnh. Dành khoảng 30 phút mỗi ngày để tập luyện thể thao sẽ
            giúp máu dễ dàng lưu thông, khiến làn da luôn rạng rỡ.
          </Text>
          <Text color="black">
            <Text color="black" bold>
              Nguồn tham khảo: {'\n'}
            </Text>
            <Text color="black" italic>
              1. https://www.nytimes.com/guides/tmagazine/skincare-routine{'\n'}
            </Text>
            <Text color="black" italic>
              2.
              https://www.goodhousekeeping.com/beauty/anti-aging/a22850819/best-skincare-routine/
              {'\n'}
            </Text>
            <Text color="black" italic>
              3. https://www.kiehls.com.vn/vi_VN/cach-cham-soc-da.html
            </Text>
          </Text>
        </VStack>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.neutral[20],
    },
    content: {
      padding: 24 * scaleW,
    },
  });
